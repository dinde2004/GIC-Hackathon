"use client";

import React from "react";
import DashboardTable from "@/feature/dashboard/instruments-table";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-20">
         {/* <span class="font-bold text-2xl py-2">Approval Form</span> */}
        <DashboardTable />
      </div>
    </main>
  );
}
