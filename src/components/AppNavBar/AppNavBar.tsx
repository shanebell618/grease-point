"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Equipment", href: "/equipment" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Inventory", href: "/inventory" },
  { label: "Documents", href: "/documents" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

export const AppNavBar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ gap: 1 }}>
        <Typography variant="h6" component="span" sx={{ mr: 3 }}>
          Grease Point
        </Typography>
        <Box
          component="nav"
          aria-label="Main"
          sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
        >
          {NAV_LINKS.map((link) => (
            <Button key={link.href} href={link.href} color="inherit">
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
