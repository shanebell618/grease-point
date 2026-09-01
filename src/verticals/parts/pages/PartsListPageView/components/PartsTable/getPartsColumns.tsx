import type { GridColDef } from "@mui/x-data-grid";
import type { Part } from "@/verticals/parts/types";
import { StatusBadge } from "@/common/components/StatusBadge";
import { formatCurrency } from "@/common/utils/formatters/formatCurrency";

export const getPartsColumns = (): GridColDef<Part>[] => [
  { field: "sku", headerName: "SKU", flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "quantityOnHand", headerName: "Quantity on hand", flex: 1 },
  {
    field: "stockStatus",
    headerName: "Status",
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      params.row.quantityOnHand <= params.row.reorderThreshold ? (
        <StatusBadge label="Low stock" color="error" />
      ) : (
        <StatusBadge label="In stock" color="success" />
      ),
  },
  {
    field: "unitCost",
    headerName: "Unit cost",
    flex: 1,
    valueFormatter: (value: number | null) => formatCurrency(value),
  },
];
