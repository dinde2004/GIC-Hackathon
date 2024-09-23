from fastapi import FastAPI, APIRouter, Request, Query, Depends, Header, HTTPException, WebSocket, WebSocketDisconnect
from ...ws_connection import ConnectionManager
from fastapi.responses import JSONResponse
import asyncio
import logging
from typing import Optional
from ..schema import LimitTestBody
from sqlalchemy.orm import Session
from ..domain.domain import broadcast_trade_execution_to_websockets
from ..schema import ApprovalRequest
from ..data_access import crud
from ...database import get_db
from ..domain.execute_trades import execute_trade
from ..domain.approval import add_notification, remove_notification
from ...ws_connection import ConnectionManager

market_analysis_route = APIRouter(prefix="/market-analysis")
discoverability_route = APIRouter(prefix="/market-analysis/discoverability")
trade_route = APIRouter(prefix="/trade")

manager = ConnectionManager()

@discoverability_route.get("/search")
async def search(
    x_user_department: Optional[str] = Header(...),
    instrument_group: Optional[str] = Query(None),
    instrument: Optional[str] = Query(None),
    risk_country: Optional[str] = Query(None),
    exchange: Optional[str] = Query(None),
    trade_ccy: Optional[str] = Query(None),
    settlement_ccy: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    instrument_to_process = ApprovalRequest(
        instrument_group=instrument_group,
        instrument=instrument,
        department=x_user_department,
        risk_country=risk_country,
        exchange=exchange,
        trade_ccy=trade_ccy,
        settlement_ccy=settlement_ccy
    )
    data = crud.search_approvals(db, instrument_to_process)
    return {"result": data}


@discoverability_route.get("/v2/search")
async def search_v2(
    approval_request: ApprovalRequest = Depends(),
    db: Session = Depends(get_db)
):
    data = crud.search_approvals(db, approval_request)
    return {"result": data}

@discoverability_route.get("/{column_name}")
async def get_values_in_column(column_name: str, db: Session = Depends(get_db)):
    func = eval(f"crud.get_{column_name}")
    data = func(db)
    return {"result": [r for (r,) in data]}


@market_analysis_route.post("/v2/create_request")
async def create_approval_request(
    approval_request: ApprovalRequest,
    db: Session = Depends(get_db)
):
    data = crud.create_approval_request(db, approval_request)
    return {"result": data}

@market_analysis_route.post("/approval")
async def post_approval(approval_request: ApprovalRequest):
    add_notification(approval_request)
    return {"result": "received"}

@market_analysis_route.post("/approval/accept")
async def accept_approval(approval_request: ApprovalRequest, db: Session = Depends(get_db)):
    # crud.add_instrument(db, approval_request)
    remove_notification(approval_request)
    return {"result": "approved"}

@market_analysis_route.post("/approval/reject")
async def reject_approval(approval_request: ApprovalRequest):
    remove_notification(approval_request)
    return {"result": "rejected"}

@trade_route.post("/{instrument_group}/{counterparty}/{amount}")
async def trade(instrument_group: str, counterparty: str, amount: int, db: Session = Depends(get_db)):
    try:
        trade_result = await execute_trade(instrument_group, counterparty, amount, db)
    except Exception as e:
        return HTTPException(status_code=400, detail="Invalid combination of instrument group and counterparty")
    return {"result": "success" if trade_result else "rate limit exceeded"}

@market_analysis_route.get("/limits")
async def get_available_limits(instrument_group: str = Query(...), db: Session = Depends(get_db)):
    data = crud.get_trade_limit(db, instrument_group)
    formatted_data = [
        {"counterparty": counterparty, "available_limit": int(available_limit)}
        for counterparty, available_limit in data
    ]
    return JSONResponse(content={"result": formatted_data})

@market_analysis_route.post("/test-limit-update")
async def test_limit_update(limit_test_body: LimitTestBody):
    status = await broadcast_trade_execution_to_websockets(limit_test_body.instrument_group, limit_test_body.instrument, 100)
    return JSONResponse(content={"status": status})
    

@market_analysis_route.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket, websocket.query_params["instrument_group"])
    await websocket.send_text("Connection established")
    try:
        while True:
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket, websocket.query_params["instrument_group"])
