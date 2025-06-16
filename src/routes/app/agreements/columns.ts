import { renderComponent } from "$lib/components/ui/data-table";
import type { LendingAgreementDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";

export type ExtendedLendingAgreementDto = LendingAgreementDto & {
  borrowerName?: string;
};
 
export const columns: ColumnDef<LendingAgreementDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "tool",
  header: "Tool",
  cell: ({ row }) => {
    const tool = row.getValue("tool") as any;
    return tool?.name ?? "N/A";
  }
 },
 {
  accessorKey: "borrowerName", // Use the resolved name instead
  header: "Borrower",
  cell: ({ row }) => {
    return row.getValue("borrowerName") as string ?? "N/A";
  }
 },
 {
  accessorKey: "lendingStartTime",
  header: "Lent Time",
  cell: ({ row }) => {
    const date = new Date(row.getValue("lendingStartTime"));
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
 },
 {
  accessorKey: "expectedReturnTime",
  header: "Expected Return Time",
  cell: ({ row }) => {
    const date = new Date(row.getValue("expectedReturnTime"));
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
 },
 {
  accessorKey: "returnTime",
  header: "Return Time",
  cell: ({ row }) => {
    const returnedTime = row.getValue("returnTime");
    if (!returnedTime) return "Not returned";
    const date = new Date(returnedTime as string);
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
 },
 {
    id: "actions",
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { id: row.original.id});
    },
  },
];