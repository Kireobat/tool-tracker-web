import { renderComponent } from "$lib/components/ui/data-table";
import type { FeeDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export const columns: ColumnDef<FeeDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "lendingAgreement",
  header: "Tool",
  cell: ({ row }) => {
    const lendingAgreement = row.getValue("lendingAgreement") as any;
    return lendingAgreement?.tool?.name ?? "N/A";
  }
 },
 {
  accessorKey: "borrower", // Changed from "lendingAgreement" to "borrower"
  header: "Borrower ID",
  cell: ({ row }) => {
    const lendingAgreement = row.original.lendingAgreement; // Access from row.original instead
    const borrowerId = lendingAgreement?.borrowerId;
    return borrowerId ? `${borrowerId}` : "N/A";
  }
 },
 {
  accessorKey: "feeAmount",
  header: "Fee Amount",
  cell: ({ row }) => {
    const amount = row.getValue("feeAmount") as number;
    return new Intl.NumberFormat("nb-NO", { 
      style: "currency", 
      currency: "NOK" 
    }).format(amount);
  }
 },
 {
  accessorKey: "status",
  header: "Status",
 },
 {
  accessorKey: "createdTime",
  header: "Created",
  cell: ({ row }) => {
    const date = new Date(row.getValue("createdTime"));
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