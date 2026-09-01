import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { MaintenanceList } from "./components/MaintenanceList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const MaintenanceListPageView = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 1,
        }}
        spacing={2}
      >
        <Typography variant="h4" component="h1">
          Maintenance
        </Typography>
        <Button href="/maintenance/new" variant="contained">
          Add Maintenance
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showing active work, upcoming service, and anything completed in the
        last 7 days.
      </Typography>
      <MaintenanceList />
    </Container>
  );
};
