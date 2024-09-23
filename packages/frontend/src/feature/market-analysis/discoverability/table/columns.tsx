"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import type { BaseInstrument } from "../../types/instruments.types";
import { DataTableRowActions } from "./row-action";
// import { DataTableRowActions } from "./row-action";

export const columns: ColumnDef<BaseInstrument>[] = [
  {
    accessorKey: "instrument_group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument Group" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("instrument_group")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "instrument",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("instrument")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("department")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "risk_country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk Country" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] break-words">
        {row.getValue("risk_country")}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "exchange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exchange" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] break-words">{row.getValue("exchange")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "trade_ccy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trade CCY" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] break-words">{row.getValue("trade_ccy")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "settlement_ccy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Settlement CCY" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] break-words">
        {row.getValue("settlement_ccy")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // To Be confirmed at a later date

  // {
  //   accessorKey: "priceQuote",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Price Quote" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[100px]">{`$${row.getValue("priceQuote")}` ?? "-"}</div>
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (state) => state.value === row.getValue("status"),
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return status.icon;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableSorting: false,
  //   enableHiding: true,
  // },
];
