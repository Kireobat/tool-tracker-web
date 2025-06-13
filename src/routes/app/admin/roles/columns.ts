import { renderComponent } from "$lib/components/ui/data-table";
import type { RoleDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export const columns: ColumnDef<RoleDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "name",
  header: "Name",
 },
 {
  accessorKey: "description", 
  header: "Description",
  cell: ({ row }) => {
    const description = row.getValue("description");
    return description || "No description";
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