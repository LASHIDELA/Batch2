import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCloseSnackBar } from "@/store/slices/snackBarSlice";
import { Alert, Box, Snackbar as MuiSnackBar } from "@mui/material";

const SnackBar = () => {
  const { open, autoHideDuration, message, severity } = useAppSelector(
    (store) => store.snackBar
  );
  const dispatch = useAppDispatch();
  setTimeout(() => {
    dispatch(setCloseSnackBar());
  }, autoHideDuration);
  return (
    <Box>
      <MuiSnackBar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackBar>
    </Box>
  );
};

export default SnackBar;
