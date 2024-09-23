// features/vendors/state/refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

import type { ReduxState } from "./store";

export enum UserRole {
  trader = "trader",
  approvalTeam = "Approval Team",
  riskManagementTeam = "Risk Management Team",
}

const initialState: { userDepartment: string; userRole: UserRole } = {
  userRole: UserRole.trader,
  userDepartment: "BAR",
};

export const refreshSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userDepartment = action.payload.userDepartment;
      state.userRole = action.payload.userRole;
    },
  },
});

export const { setUserInfo } = refreshSlice.actions;
export const userInfo = refreshSlice.reducer;
export const userInfoState = (state: ReduxState) => state.userInfo;
