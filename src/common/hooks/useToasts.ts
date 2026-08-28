import type { OptionsObject } from "notistack";
import { useSnackbar } from "notistack";

type ToastVariant = "default" | "info" | "success" | "error" | "warning";
type ToastOptions = OptionsObject<ToastVariant>;

export function useToasts() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toast = (message: string, options?: ToastOptions) =>
    enqueueSnackbar(message, options);

  const infoToast = (message: string, options?: ToastOptions) =>
    enqueueSnackbar(message, { ...options, variant: "info" });

  const successToast = (message: string, options?: ToastOptions) =>
    enqueueSnackbar(message, { ...options, variant: "success" });

  const warningToast = (message: string, options?: ToastOptions) =>
    enqueueSnackbar(message, { ...options, variant: "warning" });

  const errorToast = (message: string, options?: ToastOptions) =>
    enqueueSnackbar(message, { ...options, variant: "error" });

  return {
    enqueueSnackbar,
    closeSnackbar,
    toast,
    infoToast,
    successToast,
    warningToast,
    errorToast,
  };
}
