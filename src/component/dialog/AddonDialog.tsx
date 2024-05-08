import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slices/addonSlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { CreateAddonOption } from "@/type/addon";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (data: any) => void;
}
("");
const defaultAddon = { name: "", price: 0, addonCategoryId: undefined };
const AddonDialog = ({ open, setOpen }: Prop) => {
  const [data, setData] = useState<CreateAddonOption>(defaultAddon);
  const addonCategory = useAppSelector((store) => store.addonCategory.items);
  const dispatch = useAppDispatch();
  const handleSelect = (evt: SelectChangeEvent<number>) => {
    const addonCategoryId = evt.target.value as number;
    setData({ ...data, addonCategoryId });
  };
  const handleCreate = () => {
    dispatch(
      createAddon({
        ...data,
        onSuccess: () => {
          setOpenSnackBar({
            message: "Created Successfully",
            severity: "success",
          });
          setData(defaultAddon);
          setOpen(false);
        },
      })
    );
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Addon</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 300 }}
        >
          <TextField
            placeholder="Name"
            sx={{ my: 2 }}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setData({ ...data, name: evt.target.value });
            }}
          ></TextField>
          <TextField
            placeholder="Price"
            sx={{ my: 2 }}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setData({ ...data, price: Number(evt.target.value) });
            }}
          ></TextField>

          <Box>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Addon Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.addonCategoryId}
                label="Addon Categories"
                onChange={handleSelect}
              >
                {addonCategory.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setData(defaultAddon), setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!data.name || !data.addonCategoryId}
                onClick={handleCreate}
              >
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddonDialog;
