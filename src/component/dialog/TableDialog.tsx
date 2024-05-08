import { useAppDispatch } from "@/store/hooks";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { createTable } from "@/store/slices/tableSlice";
import { CreateTableOptions } from "@/type/table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (data: any) => void;
}
const defaultTable = { name: "", locationId: undefined };
const TableDialog = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const [newData, setNewData] = useState<CreateTableOptions>(defaultTable);

  const handleCreate = () => {
    const locationId = Number(localStorage.getItem("LocationId"));

    dispatch(
      createTable({
        ...newData,
        locationId,
        onSuccess: () => {
          setOpenSnackBar({
            message: "successfully created",
            severity: "success",
          });
          setOpen(false), setNewData(defaultTable);
        },
      })
    );
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Table</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Name"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewData({ ...newData, name: evt.target.value });
            }}
          ></TextField>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleCreate}>
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TableDialog;
