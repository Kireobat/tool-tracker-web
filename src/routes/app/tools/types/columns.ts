import { renderComponent } from "$lib/components/ui/data-table";
import type { ToolTypeDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export const columns: ColumnDef<ToolTypeDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "name",
  header: "Name",
  cell: ({ row }) => {
    const name = row.getValue("name") as string;
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
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