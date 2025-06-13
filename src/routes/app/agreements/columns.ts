import { renderComponent } from "$lib/components/ui/data-table";
import type { LendingAgreementDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
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
  accessorKey: "borrower",
  header: "Borrower",
  cell: ({ row }) => {
    const borrower = row.getValue("borrower") as any;
    return borrower ? `${borrower.firstName} ${borrower.lastName}` : "N/A";
  }
 },
 {
  accessorKey: "lentTime",
  header: "Lent Time",
  cell: ({ row }) => {
    const date = new Date(row.getValue("lentTime"));
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
  accessorKey: "returnedTime",
  header: "Returned Time",
  cell: ({ row }) => {
    const returnedTime = row.getValue("returnedTime");
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
      return renderComponent(DataTableActions, { id: row.original.id.toString() });
    },
  },
];