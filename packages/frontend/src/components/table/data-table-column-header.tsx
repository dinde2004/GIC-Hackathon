import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { Button } from "@//components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  let isSorted = <CaretSortIcon className="ml-2 h-5 w-5" />;
  if (column.getIsSorted() === "desc") {
    isSorted = <CaretDownIcon className="ml-2 h-5 w-5" />;
  }
  if (column.getIsSorted() === "asc") {
    isSorted = <CaretUpIcon className="ml-2 h-5 w-5" />;
  }
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting()}
      >
        <span>{title}</span>
        {isSorted}
      </Button>
    </div>
  );
}
