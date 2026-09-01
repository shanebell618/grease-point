"use client";

import { useEffect, useState } from "react";

import { AddPartDialog } from "./components/AddPartDialog";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { PartsTable } from "./components/PartsTable";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { usePartsListQuery } from "@/verticals/parts/hooks";

export const PartsListPageView = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isPending, isError } = usePartsListQuery(
    debouncedSearch || undefined,
  );

  return (
    <Container sx={{ py: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
        }}
        spacing={2}
      >
        <Typography variant="h4" component="h1">
          Parts
        </Typography>
        <AddPartDialog />
      </Stack>

      <TextField
        label="Search by name or SKU"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {isPending && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress aria-label="Loading parts" />
        </Box>
      )}

      {isError && (
        <Alert severity="error">
          Couldn&apos;t load parts. Try refreshing the page.
        </Alert>
      )}

      {data && data.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 4 }}>
          {debouncedSearch
            ? "No parts match your search."
            : "No parts yet. Add your first part to get started."}
        </Typography>
      )}

      {data && data.length > 0 && <PartsTable parts={data} />}
    </Container>
  );
};
