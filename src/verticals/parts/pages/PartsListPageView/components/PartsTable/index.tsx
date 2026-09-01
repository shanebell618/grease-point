"use client";

import { DataGridTable } from "@/common/components/DataGridTable";
import { EditPartDialog } from "../EditPartDialog";
import type { Part } from "@/verticals/parts/types";
import { getPartsColumns } from "./getPartsColumns";
import { useState } from "react";

interface PartsTableProps {
  parts: Part[];
}

export const PartsTable = ({ parts }: PartsTableProps) => {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <>
      <DataGridTable
        rows={parts}
        columns={getPartsColumns()}
        onRowClick={(params) => setSelectedPart(params.row)}
      />
      {selectedPart && (
        <EditPartDialog
          key={selectedPart.id}
          part={selectedPart}
          open
          onClose={() => setSelectedPart(null)}
        />
      )}
    </>
  );
};
