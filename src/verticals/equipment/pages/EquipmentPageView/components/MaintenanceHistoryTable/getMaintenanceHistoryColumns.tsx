import type { GridColDef } from "@mui/x-data-grid";
import type { Maintenance } from "@/verticals/maintenance/types";
import { MaintenanceStatusBadge } from "@/verticals/maintenance/components/MaintenanceStatusBadge";
import { formatCurrency } from "@/common/utils/formatters/formatCurrency";
import { formatDate } from "@/common/utils/formatters/formatDate";

export const getMaintenanceHistoryColumns = (): GridColDef<Maintenance>[] => [
  {
    field: "performedAt",
    headerName: "Performed",
    flex: 1,
    valueFormatter: (value: string) => formatDate(value),
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <MaintenanceStatusBadge status={params.row.status} />
    ),
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    valueFormatter: (value: number | null) => formatCurrency(value),
  },
  {
    field: "nextDueDate",
    headerName: "Next due",
    flex: 1,
    valueFormatter: (value: string | null) => formatDate(value),
  },
];
