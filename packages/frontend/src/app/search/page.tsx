"use client";

import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchComponent() {
  return (
    <main className="flex min-h-screen  pt-10 items-start justify-center">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[336px]"
        />
      </div>
    </main>
  );
}
