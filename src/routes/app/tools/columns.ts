import type { ToolDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
 
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
 }
];