"use client";

import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export interface FacetedFilterProps {
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: JSX.Element;
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterBy: string;
  facetedFilter: FacetedFilterProps[];
}

export function DataTableToolbar<TData>({
  table,
  filterBy,
  facetedFilter,
}: DataTableToolbarProps<TData>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const isFiltered =
    facetedFilter.length > 0
      ? facetedFilter.flatMap((filter) => searchParams.getAll(filter.columnId))
          .length > 0
      : false;

  const resetSelected = () => {
    const params = new URLSearchParams(searchParams.toString());
    facetedFilter?.forEach((filter) => params.delete(filter.columnId));
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };

  const setPredicate = debounce((predicate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("predicate", predicate);
    replace(`${pathname}?${params.toString()}`);
  }, 250);

  return (
    <div className="flex items-center justify-between max-w-full">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Search ${filterBy}...`}
          defaultValue={searchParams.get("predicate") ?? ""}
          onChange={(event) => setPredicate(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="flex flex-1 items-center space-x-2 flex-wrap">
          {facetedFilter
            .filter((filter) => table.getColumn(filter.columnId))
            .map((filter) => (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={table.getColumn(filter.columnId)!} // assert is safe as it is filtered earlier
                title={filter.title}
                options={filter.options}
              />
            ))}
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={resetSelected}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
