import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeAddons, updateAddon } from "@/store/slices/addonSlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { UpdateAddonOption } from "@/type/addon";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateAddon = () => {
  const router = useRouter();
  const addonId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<UpdateAddonOption>();
  const dispatch = useAppDispatch();
  const addons = useAppSelector((store) => store.addon.items);
  const addon = addons.find((item) => item.id === addonId);
  const addonCategories = useAppSelector((store) => store.addonCategory.items);
  //   const addonCategoryFilter = addonCategories.filter(
  //     (item) => item.id === addonCategoryId
  //   );
  //   const menuIds = menuAddonCategoriesFilter.map((item) => item.menuId);

  useEffect(() => {
    if (addon) {
      setData({
        id: addonId,
        name: addon.name,
        price: addon.price,
        addonCategoryId: addon.addonCategoryId,
      });
    }
  }, [addon]);

  const handleSelect = (evt: SelectChangeEvent<number>) => {
    const addonCategoryId = evt.target.value as number;
    setData({ ...data, addonCategoryId });
  };
  const onSuccess = () => {
    router.push(`/backoffice/addon-category`);
  };
  const handleDelete = () => {
    dispatch(
      removeAddons({
        id: addonId,
        onSuccess: () => {
          dispatch(
            setOpenSnackBar({
              message: "Successfully Deleted",
              severity: "success",
            })
          );
          router.push("/backoffice/addon");
        },
      })
    );
  };
  if (!data) return null;
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
          maxWidth: 300,
          my: 3,
        }}
      >
        {
          <TextField
            sx={{ mb: 3 }}
            defaultValue={data.name}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setData({ ...data, name: evt.target.value });
            }}
          />
        }
        {
          <TextField
            sx={{ mb: 3 }}
            defaultValue={data.price}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setData({ ...data, price: Number(evt.target.value) });
            }}
          />
        }
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
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ mx: 3 }}
            onClick={() => router.push("/backoffice/addon")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              dispatch(
                updateAddon({
                  ...data,
                  onSuccess: () => {
                    dispatch(
                      setOpenSnackBar({
                        message: "Updated Successfully",
                        severity: "success",
                      })
                    );
                    router.push("/backoffice/addon");
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

export default UpdateAddon;
