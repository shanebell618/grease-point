import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { GridColDef } from "@mui/x-data-grid";

import { DataGridTable } from "./";

interface SampleRow {
  id: string;
  name: string;
  status: string;
  operatingHours: number;
}

const sampleRows: SampleRow[] = [
  {
    id: "1",
    name: "CAT 320 Excavator",
    status: "Active",
    operatingHours: 1240.5,
  },
  {
    id: "2",
    name: "Bobcat S650 Skid Steer",
    status: "Maintenance",
    operatingHours: 890,
  },
  {
    id: "3",
    name: "John Deere 850K Dozer",
    status: "Active",
    operatingHours: 2310.25,
  },
];

const sampleColumns: GridColDef<SampleRow>[] = [
  { field: "name", headerName: "Name", flex: 2 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "operatingHours", headerName: "Operating hours", flex: 1 },
];

const meta: Meta<typeof DataGridTable> = {
  title: "Components/DataGridTable",
  component: DataGridTable,
  parameters: { layout: "padded" },
  args: {
    rows: sampleRows,
    columns: sampleColumns,
  },
};

export default meta;
type Story = StoryObj<typeof DataGridTable>;

export const Default: Story = {};

// Rows get a pointer cursor and become clickable — this is what
// MaintenanceHistoryTable uses to open the edit dialog on row click.
export const WithRowClick: Story = {
  args: {
    onRowClick: () => {},
  },
};

// The equipment-detail maintenance history table uses this: no pagination
// controls, since that history is usually short and pagination UI would
// just be visual noise for three rows.
export const WithoutPagination: Story = {
  args: {
    hidePagination: true,
  },
};

export const Empty: Story = {
  args: {
    rows: [],
  },
};
