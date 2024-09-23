"use client";

import { useSearchParams } from "next/navigation";

import { DataTable } from "@/components/table/data-table";
import type { FacetedFilterProps } from "@/components/table/data-table-toolbar";

import {
  useGetFacetedValuesQuery,
  useGetPaginatedInstrumentsQuery,
} from "@/services/marketAnalysisAPI";

import { columns } from "./columns";

export const InstrumentTable = () => {
  const param = useSearchParams();
  const {
    data: instruments,
    isLoading: isInstrumentsLoading,
    isError: isInstruementsError,
  } = useGetPaginatedInstrumentsQuery(param.toString());
  const {
    data: instrumentGroups,
    isLoading: isILoading,
    isError: isIError,
  } = useGetFacetedValuesQuery("instrument_group");

  const {
    data: riskCountry,
    isLoading: isRCLoading,
    isError: isRCError,
  } = useGetFacetedValuesQuery("risk_country");

  const {
    data: exchange,
    isLoading: isELoading,
    isError: isEError,
  } = useGetFacetedValuesQuery("exchange");

  const {
    data: tradeCCY,
    isLoading: isTCCYLoading,
    isError: isTCCYError,
  } = useGetFacetedValuesQuery("trade_ccy");

  const {
    data: settlementCCY,
    isLoading: isSCCYLoading,
    isError: isSCCYError,
  } = useGetFacetedValuesQuery("settlement_ccy");

  const isloading =
    isILoading ||
    isRCLoading ||
    isELoading ||
    isTCCYLoading ||
    isSCCYLoading ||
    isInstrumentsLoading;
  const isError =
    isIError ||
    isRCError ||
    isEError ||
    isTCCYError ||
    isSCCYError ||
    isInstruementsError;

  if (isloading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  const facetedFilter: FacetedFilterProps[] = [
    {
      columnId: "instrument_group",
      title: "Instrument Group",
      options: instrumentGroups!.result.map((group) => ({
        label: group,
        value: group,
        icon: undefined,
      })),
    },
    {
      columnId: "risk_country",
      title: "Risk Country",
      options: riskCountry!.result.map((group) => ({
        label: group,
        value: group,
        icon: undefined,
      })),
    },
    {
      columnId: "exchange",
      title: "Exchange",
      options: exchange!.result.map((group) => ({
        label: group,
        value: group,
        icon: undefined,
      })),
    },
    {
      columnId: "trade_ccy",
      title: "Trade CCY",
      options: tradeCCY!.result.map((group) => ({
        label: group,
        value: group,
        icon: undefined,
      })),
    },
    {
      columnId: "settlement_ccy",
      title: "Settlement CCY",
      options: settlementCCY!.result.map((group) => ({
        label: group,
        value: group,
        icon: undefined,
      })),
    },
  ];
  return (
    <div className="max-w-full min-h-[50vh]">
      {instruments ? (
        <DataTable
          columns={columns}
          data={instruments.result}
          filterBy="name"
          facetedFilter={facetedFilter}
        />
      ) : null}
    </div>
  );
};
