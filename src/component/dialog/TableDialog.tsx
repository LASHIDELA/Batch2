import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Prop {
  open: boolean;
  setOpen: (data: any) => void;
}
const TableDialog = ({ open, setOpen }: Prop) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Table</DialogTitle>
        <DialogContent>
          <TextField placeholder="Name"></TextField>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained">Create</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TableDialog;
