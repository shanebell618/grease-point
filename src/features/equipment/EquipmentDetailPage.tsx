"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useEquipmentQuery } from "./hooks";
import { EquipmentDetail } from "./components/EquipmentDetail";

interface EquipmentDetailPageProps {
  id: string;
}

export const EquipmentDetailPage = ({ id }: EquipmentDetailPageProps) => {
  const { data, isPending, isError } = useEquipmentQuery(id);

  return (
    <Container sx={{ py: 4 }}>
      {isPending && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress aria-label="Loading equipment" />
        </Box>
      )}
      {isError && (
        <Alert severity="error">
          Couldn&apos;t load this equipment. It may have been deleted.
        </Alert>
      )}
      {data && <EquipmentDetail equipment={data} />}
    </Container>
  );
};
