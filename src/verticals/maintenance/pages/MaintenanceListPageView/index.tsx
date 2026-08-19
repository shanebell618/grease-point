import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { MaintenanceList } from "./components/MaintenanceList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const MaintenanceListPageView = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
        spacing={2}
      >
        <Typography variant="h4" component="h1">
          Maintenance
        </Typography>
        <Button href="/maintenance/new" variant="contained">
          Add Maintenance Record
        </Button>
      </Stack>
      <MaintenanceList />
    </Container>
  );
};
