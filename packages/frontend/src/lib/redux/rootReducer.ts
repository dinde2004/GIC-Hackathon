import { rootApi } from "@/services";

import { userInfo } from "./userInfoSlice";

export const reducer = {
  [rootApi.reducerPath]: rootApi.reducer,
  userInfo,
};
