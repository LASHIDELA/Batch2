import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/addonCategorySlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { CreateAddonCategory } from "@/type/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { ChangeEvent, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (data: any) => void;
}
const defaultAddonCategory = { name: "", isRequired: true, menuIds: [] };

const AddonCategoryDialog = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector((store) => store.menu.items);

  // const addonCategories = useAppSelector((store) => store);
  const [newAddonCategory, setNewAddonCategory] =
    useState<CreateAddonCategory>(defaultAddonCategory);
  const handleSelect = (evt: SelectChangeEvent<number[]>) => {
    const menuIds = evt.target.value as number[];
    setNewAddonCategory({ ...newAddonCategory, menuIds });
  };
  const handleCreate = () => {
    const isValid =
      newAddonCategory.name || newAddonCategory.menuIds.length > 0;
    if (!isValid) return null;
    dispatch(
      createAddonCategory({
        ...newAddonCategory,
        onSuccess: () => {
          dispatch(
            setOpenSnackBar({
              message: "Created Successfull",
              severity: "success",
            })
          );
          setOpen(false);
        },
      })
    );
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Addon Category</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 300 }}
        >
          <TextField
            sx={{ mb: 2 }}
            placeholder="Name"
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewAddonCategory({
                ...newAddonCategory,
                name: evt.target.value,
              });
            }}
          ></TextField>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Menus</InputLabel>
            <Select
              id="demo-multiple-checkbox"
              multiple
              value={newAddonCategory.menuIds}
              onChange={handleSelect}
              input={<OutlinedInput label="Menus" />}
              renderValue={(selectedMenuIds) => {
                return selectedMenuIds
                  .map((selectedMenuId) => {
                    return menus.find(
                      (item) => item.id === selectedMenuId
                    ) as Menu;
                  })
                  .map((item) => (
                    <Chip key={item.id} label={item.name} sx={{ mr: 1 }} />
                  ));
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                  },
                },
              }}
            >
              {menus.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox
                    checked={newAddonCategory.menuIds.includes(item.id)}
                  />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={newAddonCategory.isRequired}
                onChange={(evt, value) => {
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: value,
                  });
                }}
              />
            }
            label={"isRequired"}
          />

          <DialogActions
            sx={{ display: "flex", mt: 2, justifyContent: "center" }}
          >
            <Button variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={
                !newAddonCategory.name || !newAddonCategory.menuIds.length
              }
              onClick={handleCreate}
            >
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddonCategoryDialog;
