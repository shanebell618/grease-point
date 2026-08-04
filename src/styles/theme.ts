import { createTheme } from "@mui/material/styles";

// TODO(dark-mode breadcrumb): swap this static theme for one driven by
// palette.mode + a toggle component with a persisted user preference.
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2e5b4c" },
  },
});
