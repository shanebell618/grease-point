import type { Preview } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../src/styles/theme";

const preview: Preview = {
  decorators: [
    (Story) => {
      // A fresh QueryClient per story, same reasoning as providers.tsx's
      // useState(() => new QueryClient()) — stories re-mount often, and a
      // shared client would leak cached data/errors between them.
      const [queryClient] = useState(() => new QueryClient());

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
              <Story />
            </QueryClientProvider>
          </LocalizationProvider>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
