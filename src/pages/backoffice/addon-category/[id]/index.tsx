import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeAddonCategories,
  updateAddonCategories,
} from "@/store/slices/addonCategorySlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { UpdateAddonCategory } from "@/type/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
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
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateAddonCategory = () => {
  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<UpdateAddonCategory>();
  const dispatch = useAppDispatch();
  const addonCategories = useAppSelector((store) => store.addonCategory.items);
  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
  const menuAddonCategories = useAppSelector(
    (store) => store.menuAddonCategory.items
  );
  const menuAddonCategoriesFilter = menuAddonCategories.filter(
    (item) => item.addonCategoryId === addonCategoryId
  );
  const menuIds = menuAddonCategoriesFilter.map((item) => item.menuId);
  const menus = useAppSelector((store) => store.menu.items);
  useEffect(() => {
    if (addonCategory) {
      setData({
        id: addonCategoryId,
        isRequired: addonCategory.isRequired,
        name: addonCategory.name,
        menuIds,
      });
    }
  }, [addonCategory]);

  const handleSelect = (evt: SelectChangeEvent<number[]>) => {
    const menuIds = evt.target.value as number[];
    setData({ ...data, menuIds });
  };
  const onSuccess = () => {
    router.push(`/backoffice/addon-category`);
  };
  const handleDelete = () => {
    dispatch(
      removeAddonCategories({
        id: addonCategoryId,
        onSuccess: () => {
          dispatch(
            setOpenSnackBar({
              message: "Successfully Deleted",
              severity: "success",
            })
          ),
            router.push("/backoffice/addon-category");
        },
      })
    );
  };
  if (!data || !addonCategory || !menus) return null;
  return (
    <Box>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "flex-end",
          mr: 5,
        }}
      >
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          DELETE
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          my: 3,
        }}
      >
        {
          <TextField
            sx={{ mb: 3 }}
            defaultValue={addonCategory.name}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setData({ ...data, name: evt.target.value });
            }}
          />
        }
        <FormControl sx={{ width: 500 }}>
          <InputLabel id="demo-multiple-checkbox-label">Menus</InputLabel>
          <Select
            sx={{ maxWidth: 500 }}
            id="demo-multiple-checkbox"
            multiple
            value={data.menuIds}
            onChange={handleSelect}
            input={<OutlinedInput label="Menus" />}
            renderValue={(selectedMenuIds) => {
              return selectedMenuIds
                .map((selectedMenuId) => {
                  return menus.find((menu) => menu.id === selectedMenuId);
                })
                .map((item) => {
                  return (
                    <Chip key={item.id} label={item.name} sx={{ mr: 1 }} />
                  );
                });
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
                <Checkbox checked={data.menuIds.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={data.isRequired}
              onChange={(evt, value) => {
                setData({
                  ...data,
                  isRequired: value,
                });
              }}
            />
          }
          label={"isRequired"}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ mx: 3 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              dispatch(
                updateAddonCategories({
                  ...data,
                  onSuccess: () => {
                    dispatch(
                      setOpenSnackBar({
                        message: "Updated Successfully",
                        severity: "success",
                      })
                    );
                  },
                })
              )
            }
          >
            Update
          </Button>
        </Box>
      </Box>

      <Box>
        <Dialog open={open}>
          <DialogContent>Are You Sure To Delete!</DialogContent>
          <Box sx={{ display: "flex", mb: 3, justifyContent: "space-around" }}>
            <Button
              defaultChecked={true}
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button variant="outlined" onClick={handleDelete}>
              Yes
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UpdateAddonCategory;
