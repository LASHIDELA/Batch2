type SnackbarSeverity = "success" | "error";
export interface SnackBar {
  open: boolean;
  message: string | null;
  autoHideDuration: number;
  severity: SnackbarSeverity;
}
