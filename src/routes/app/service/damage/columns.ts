import { renderComponent } from "$lib/components/ui/data-table";
import type { DamageReportDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export type ExtendedDamageReportDto = DamageReportDto & {
  borrowerName?: string;
};

export const columns: ColumnDef<DamageReportDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "tool",
  header: "Tool",
  cell: ({ row }) => {
    const tool = row.getValue("tool") as any;
    if (tool) return tool.name;
    
    const lendingAgreement = row.original.lendingAgreement;
    return lendingAgreement?.tool?.name ?? "N/A";
  }
 },
 {
  accessorKey: "description",
  header: "Description",
 },
 {
  accessorKey: "borrowerName", // Use the resolved name instead
  header: "Borrower",
  cell: ({ row }) => {
    return row.getValue("borrowerName") as string ?? "N/A";
  }
 },
 {
  accessorKey: "createdTime",
  header: "Reported",
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