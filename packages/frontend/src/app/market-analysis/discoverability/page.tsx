"use client";

import { InstrumentTable } from "@/feature/market-analysis/discoverability/table/instrument-table";

const Page = () => {
  return (
    <div className="flex flex-col px-20 w-full">
      <h1 className="h-full text-3xl font-bold flex-1 flex-col gap-y-8 pb-10 pt-5">
        Instruments
      </h1>
      <div className="max-w-full">
        <InstrumentTable />
      </div>
    </div>
  );
};

export default Page;
