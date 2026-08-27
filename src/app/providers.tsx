"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { theme } from "@/styles/theme";
import { useState } from "react";

// Devtools are dev-only UI; dynamically imported (client-only) so the
// package never ends up in the production bundle.
const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then(
      (mod) => mod.ReactQueryDevtools,
    ),
  { ssr: false },
);

interface ProvidersProps {
  children: React.ReactNode;
}

// TODO(toasts breadcrumb): add a global ToastProvider here (MUI Snackbar +
// Alert) so mutations across features can surface success/error toasts
// instead of each feature building its own.
export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
