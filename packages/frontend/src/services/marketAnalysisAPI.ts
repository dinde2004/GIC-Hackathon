import { buildServiceUrl, rootApi } from "@/services/index";

import type {
  ApprovalFormRequest,
  BaseInstrument,
  FacetedFilterResponse,
  LimitRequest
} from "@/feature/market-analysis/types/instruments.types";

const prefix = "/market-analysis";
const noPrefix = "";
export const vendorPerPage = 20; // static for now

export const instrumentsApi = rootApi.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedInstruments: builder.query<
      { result: BaseInstrument[] },
      string
    >({
      query: (queryString: string) => ({
        url: buildServiceUrl(prefix, `/discoverability/search?${queryString}`),
        method: "GET",
      }),
    }),
    getFacetedValues: builder.query<FacetedFilterResponse, string>({
      query: (columnName) => ({
        url: buildServiceUrl(prefix, `/discoverability/${columnName}`),
        method: "GET",
      }),
    }),
    getAllValues: builder.query<LimitRequest[], string>({
      query: (instrumentGroup) => ({
        url: buildServiceUrl(noPrefix, `/limits/${instrumentGroup}`),
        method: "GET",
      }),
    }),
    postTrade: builder.mutation<string, string>({
      query: (requestBody) => ({
        url: buildServiceUrl(noPrefix, `/trade`),
        method: "POST",
        body: requestBody,
      }),
    }),

    postApprovalForm: builder.mutation<string, BaseInstrument>({
      // postApprovalForm: builder.mutation<string[], ApprovalFormRequest>({
      query: (requestBody) => ({
        url: buildServiceUrl(prefix, `/approval`),
        method: "POST",
        body: requestBody,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPaginatedInstrumentsQuery,
  useGetFacetedValuesQuery,
  useGetAllValuesQuery,
  usePostTradeMutation,
  // useGetApprovalRequestsQuery,
  usePostApprovalFormMutation,
} = instrumentsApi;
