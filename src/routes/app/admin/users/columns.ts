import { renderComponent } from "$lib/components/ui/data-table";
import type { UserDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export const columns: ColumnDef<UserDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "name",
  header: "Name",
 },
 {
  accessorKey: "email",
  header: "Email",
 },
 {
  accessorKey: "employeeId",
  header: "Employee ID",
 },
 {
  accessorKey: "roles",
  header: "Roles",
  cell: ({ row }) => {
    const roles = row.getValue("roles") as any[];
    if (!roles || roles.length === 0) return "No roles";
    return roles.map(role => role.name).join(", ");
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