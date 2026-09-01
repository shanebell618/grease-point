import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const NotFoundPage = () => (
  <Container sx={{ py: 4 }}>
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" component="p" sx={{ mb: 1 }}>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </Typography>
      <Button href="/equipment" variant="contained">
        Back to Equipment
      </Button>
    </Box>
  </Container>
);
