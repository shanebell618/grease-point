"use client";

import type { SxProps, Theme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { DataGridProps } from "@mui/x-data-grid";

type AllowedDataGridProps = Pick<
  DataGridProps,
  "rows" | "columns" | "getRowId" | "initialState"
>;

export interface DataGridTableProps extends AllowedDataGridProps {
  pageSizeOptions?: number[];
  sx?: SxProps<Theme>;
  hidePagination?: boolean;
}

export const DataGridTable = ({
  rows = [],
  columns,
  getRowId,
  initialState,
  pageSizeOptions = [10, 25, 50],
  sx,
  hidePagination = false,
}: DataGridTableProps) => {
  const effectivePageSize = hidePagination ? rows.length : pageSizeOptions[0];

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <DataGrid
        autoHeight
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        density="standard"
        getRowId={getRowId ?? ((row) => row.id)}
        initialState={
          hidePagination
            ? initialState
            : {
                ...initialState,
                pagination: {
                  ...initialState?.pagination,
                  paginationModel: {
                    pageSize: effectivePageSize,
                    ...initialState?.pagination?.paginationModel,
                  },
                },
              }
        }
        hideFooter={hidePagination}
        pageSizeOptions={hidePagination ? [rows.length] : pageSizeOptions}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          ...sx,
        }}
      />
    </Box>
  );
};
