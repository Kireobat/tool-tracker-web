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
  accessorKey: "type.name",
  header: "Type",
 },
 {
    id: "actions",
    cell: ({ row }) => {
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id.toString(), serial: row.original.serial });
    },
  },
];