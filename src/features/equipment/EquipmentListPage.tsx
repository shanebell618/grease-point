import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EquipmentList } from "./components/EquipmentList";

export const EquipmentListPage = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
        spacing={2}
      >
        <Typography variant="h4" component="h1">
          Equipment
        </Typography>
        <Button href="/equipment/new" variant="contained">
          Add Equipment
        </Button>
      </Stack>
      <EquipmentList />
    </Container>
  );
};
