import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { UpdateMenuCategoryOption } from "@/type/menuCategory";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateMenuCategory = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<UpdateMenuCategoryOption>();
  const dispatch = useAppDispatch();
  const menuCategorys = useAppSelector((store) => store.menuCategory.items);
  const menuCategory = menuCategorys.find((item) => item.id === menuCategoryId);
  const disableLocationMenuCategories = useAppSelector(
    (store) => store.disableLocationMenuCategory.items
  );

  useEffect(() => {
    if (menuCategory) {
      const selectedLocationId = Number(localStorage.getItem("LocationId"));
      const exit = disableLocationMenuCategories.find(
        (item) =>
          item.menuCategoryId === menuCategoryId &&
          item.locationId === selectedLocationId
      );

      setData({
        id: menuCategoryId,
        name: menuCategory.name,
        locationId: selectedLocationId,
        isAvalible: exit ? false : true,
      });
    }
  }, [menuCategory, disableLocationMenuCategories]);

  const onSuccess = () => {
    router.push(`/backoffice/addon-category`);
  };
  const handleUpdateMenu = () => {
    dispatch(
      updateMenuCategory({
        ...data,
        onSuccess: () => {
          dispatch(
            setOpenSnackBar({
              message: "Updated Successfully",
              severity: "success",
            })
          );
          router.push("/backoffice/menu-category");
        },
      })
    );
  };
  if (!data) return null;
  const handleDelete = () => {
    dispatch(
      deleteMenuCategory({
        id: menuCategoryId,
        onSuccess: () => {
          dispatch(
            setOpenSnackBar({
              message: "Successfully Deleted",
              severity: "success",
            })
          );
          router.push("/backoffice/menu-category");
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
        <FormControlLabel
          control={<Switch defaultChecked={data.isAvalible} />}
          label="Avalible"
          onChange={(evt, value) => setData({ ...data, isAvalible: value })}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ mx: 3 }}
            onClick={() => router.push("/backoffice/menu-category")}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateMenu}>
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

export default UpdateMenuCategory;
