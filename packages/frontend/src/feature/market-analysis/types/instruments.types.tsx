export interface BaseInstrument {
  id: number;
  instrumentGroup: string;
  instrument: string;
  department: string;
  risk: string;
  country: string;
  exchange: string;
  tradeCCY: string;
  settlementCCY: string;
}

export interface InstrumentGetResponse {
  result: BaseInstrument[];
}

export interface FacetedFilterResponse {
  result: string[];
}

export interface ApprovalFormRequest {
  result: {
    status: string;
    message: string;
    data: BaseInstrument[];
  };
}

export interface LimitRequest {
  result: {
    counterparty: string;
    available_limit: number;
  };
}
