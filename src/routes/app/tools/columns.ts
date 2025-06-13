import { renderComponent } from "$lib/components/ui/data-table";
import type { ToolDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export const columns: ColumnDef<ToolDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "name",
  header: "Name",
 },
 {
  accessorKey: "serial",
  header: "Serial",
 },
 {
  accessorKey: "status",
  header: "Status",
 },
 {
  accessorKey: "type.name",
  header: "Type",
 },
 {
  accessorKey: "createdTime",
  header: "Registered at",
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
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id.toString(), serial: row.original.serial });
    },
  },
];