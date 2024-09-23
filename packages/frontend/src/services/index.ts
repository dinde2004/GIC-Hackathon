// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { UserRole } from "@/lib/redux/userInfoSlice";

const getEnvironmentUrl = () => {
  return "http://localhost:8000";
};

export const buildServiceUrl = (prefix: string, query: string) => {
  return `${getEnvironmentUrl()}${prefix}${query}`;
};

// initialize an empty api service that we'll inject endpoints into later as needed

// Assuming you have an interface for your state
interface RootState {
  userInfo?: {
    userDepartment?: string;
    userRole?: UserRole;
  };
}

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000 ",
    prepareHeaders: async (headers, { getState }) => {
      const state = (await getState()) as RootState;
      const deparment = state.userInfo?.userDepartment;
      const role = state.userInfo?.userRole;

      if (deparment) {
        headers.set("X-USER-DEPARTMENT", deparment);
      }
      if (role) {
        headers.set("X-USER-ROLE", role.toString());
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
