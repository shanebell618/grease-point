"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { SiteLogo } from "./components/SiteLogo";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Equipment", href: "/equipment" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Parts", href: "/parts" },
  { label: "Documents", href: "/documents" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

export const AppNavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ gap: 1, justifyContent: "space-between" }}>
        <SiteLogo />

        <Box
          component="nav"
          aria-label="Main"
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Button key={link.href} href={link.href} color="inherit">
              {link.label}
            </Button>
          ))}
        </Box>

        <IconButton
          color="inherit"
          aria-label="Open navigation menu"
          onClick={() => setMobileNavOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" }, ml: "auto" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton
              aria-label="Close navigation menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List component="nav" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <ListItemButton
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
