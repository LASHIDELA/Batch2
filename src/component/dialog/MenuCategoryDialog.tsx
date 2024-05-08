import { useAppDispatch } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
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
let defaultMenuCategory = "";
const MenuCategoryDialog = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>(defaultMenuCategory);

  const onSuccess = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    const locationId = Number(localStorage.getItem("LocationId"));
    dispatch(createMenuCategory({ name, locationId, onSuccess }));
  };
  const handleCancel = () => {
    setName(defaultMenuCategory), setOpen(false);
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Menu Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            placeholder="Name"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setName(evt.target.value)}
          ></TextField>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" disabled={!name} onClick={handleCreate}>
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MenuCategoryDialog;
