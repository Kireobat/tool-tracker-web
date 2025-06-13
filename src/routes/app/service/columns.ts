import { renderComponent } from "$lib/components/ui/data-table";
import type { DamageReportDto, ToolDto, ToolServiceEventDto } from "$lib/generated/tool-tracker";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte";
 
export const columns: ColumnDef<ToolServiceEventDto>[] = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "damageReportDto",
  header: "Tool",
  cell: ({ row }) => {
    const damageReportDto: DamageReportDto = row.getValue("damageReportDto");

    let toolName = "Ikke Oppgitt";

    if (damageReportDto.tool) {
      const tool: ToolDto = damageReportDto.tool;
      toolName = tool.name;
    } else if (damageReportDto.lendingAgreement) {
      const lendingAgreement = damageReportDto.lendingAgreement;
      if (lendingAgreement.tool) {
        const tool: ToolDto = lendingAgreement.tool;
        toolName = tool.name;
      }
    }

    return toolName
  }
 },
 {
  accessorKey: "serviceStartTime",
  header: "Service start time",
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
 },{
  accessorKey: "serviceStopTime",
  header: "Service stop time",
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
      return renderComponent(DataTableActions, { id: row.original.id.toString(), reportId: row.original.damageReportDto.id.toString() });
    },
  },
];