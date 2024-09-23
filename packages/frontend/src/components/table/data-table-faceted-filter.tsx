"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import isEqual from "lodash.isequal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui//button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface DataTableFacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: JSX.Element;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const facets = column?.getFacetedUniqueValues();
  const { replace } = useRouter();
  const [selectedVal, setSelected] = React.useState<string>("");

  // on refresh, load the URL into the selectedVal state
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const decodedObj = Array.from(params.entries()).reduce(
      (acc: Record<string, string>, [key, value]: [string, string]) => {
        acc[key] = decodeURIComponent(value);
        return acc;
      },
      {},
    );
    const filters = decodedObj[column.id] ? decodedObj[column.id] : "";

    // We need to ensure that if there are no changes to facted args, it does not run this set page since
    // it might be a set page operation that we do not want to interrupt
    if (!isEqual(filters, selectedVal)) setSelected(filters);
  }, [searchParams]);

  // any changes to the filter on the frontend gets updated to the URL
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const updateURL = (enumObj: {
      query?: string;
      [key: string]: string | undefined;
    }) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in enumObj) {
        if (enumObj[key]) {
          params.set(column.id, enumObj[key]!.toString());
        } else {
          params.delete(column.id);
        }
      }

      // params.set("page", "1");

      replace(`${pathname}?${params}`);
    };
    if (selectedVal) {
      const obj = {
        query: params.get(column.id) || "",
        [column.id]: selectedVal,
      };
      updateURL(obj);
    }
  }, [selectedVal]);

  const removeFilters = () => {
    console.log("removeFilters");
    setSelected("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}

          <div className="hidden space-x-1 lg:flex">
            {selectedVal !== "" &&
              options
                .filter((option) => selectedVal === option.value)
                .map((option) => (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge
                      variant="outline"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  </>
                ))}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                // const isSelected = selectedValues.has(option.value);
                const isSelect = selectedVal === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => setSelected(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelect
                          ? "bg-pink-400"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon}
                    <span>{option.label}</span>
                    {facets?.get(option.value) !== undefined && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedVal !== "" && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={removeFilters}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
