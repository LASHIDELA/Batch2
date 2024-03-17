import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { MenuPayLoad } from "@/type/menu";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (data: any) => void;
}
const defaultMenu = { name: "", price: 0, menuCategoryId: [] };
const MenuDialog = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const menuCateogories = useAppSelector((store) => store.menuCategory.items);
  const [newMenu, setNewMenu] = useState<MenuPayLoad>(defaultMenu);
  const handleSelect = (evt: SelectChangeEvent<number[]>) => {
    const selectedMenuCategoryId = evt.target.value as number[];
    setNewMenu({ ...newMenu, menuCategoryId: selectedMenuCategoryId });
  };

  const handleCreateMenu = () => {
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess: () => {
          setOpen(false);
        },
      })
    );
  };
  if (!newMenu) return null;
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Menus</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="Name"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewMenu({ ...newMenu, name: evt.target.value });
            }}
          ></TextField>
          <TextField
            placeholder="Price"
            sx={{ my: 2 }}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewMenu({ ...newMenu, price: Number(evt.target.value) });
            }}
          ></TextField>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              MenuCategories
            </InputLabel>
            <Select
              id="demo-multiple-checkbox"
              multiple
              value={newMenu.menuCategoryId}
              onChange={handleSelect}
              input={<OutlinedInput label="MenuCategories" />}
              renderValue={(selectedMenuCategoryIds) => {
                return selectedMenuCategoryIds
                  .map((selectedMenuCategoryId) => {
                    return menuCateogories.find(
                      (item) => item.id === selectedMenuCategoryId
                    );
                  })
                  .map((item) => item.name)
                  .join(", ");
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                  },
                },
              }}
            >
              {menuCateogories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox
                    checked={newMenu.menuCategoryId.includes(item.id)}
                  />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
                setNewMenu(defaultMenu);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!newMenu.name || !newMenu.menuCategoryId.length}
              onClick={handleCreateMenu}
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MenuDialog;
