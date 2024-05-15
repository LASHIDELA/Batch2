import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu, upDateMenu } from "@/store/slices/menuSlice";
import { UpdateMenu } from "@/type/menu";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Checkbox,
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
  Switch,
  TextField,
} from "@mui/material";
import { Menucategory } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
const UpdateMenu = () => {
  const router = useRouter();
  const menuId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [upDateMenuData, setUpDateMenu] = useState<UpdateMenu>();
  const dispatch = useAppDispatch();
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );
  const menuCategoryIdFind = menuCategoryMenus.filter(
    (item) => item.menuId === menuId
  );
  const menuCategoryIds = menuCategoryIdFind.map((item) => item.menuCategoryId);
  const menus = useAppSelector((store) => store.menu.items);
  const menu = menus.find((item) => item.id === menuId);
  const disableLocationMenu = useAppSelector(
    (store) => store.disableLocationMenu.items
  );

  useEffect(() => {
    if (menu) {
      const isAvailable = disableLocationMenu.find(
        (item) => item.menuId === menuId
      );
      const locationId = Number(localStorage.getItem("LocationId"));
      setUpDateMenu({
        id: menuId,
        name: menu.name,
        price: menu.price,
        menuCategoryId: menuCategoryIds,
        locationId: locationId,
        isAvailable: isAvailable ? false : true,
      });
    }
  }, [menu, disableLocationMenu]);
  const handleSelect = (evt: SelectChangeEvent<number[]>) => {
    const menuCategoryIds = evt.target.value as number[];
    setUpDateMenu({ ...upDateMenuData, menuCategoryId: menuCategoryIds });
  };
  const onSuccess = () => {
    router.push(`/backoffice/menu`);
  };
  const handleDelete = () => {
    dispatch(deleteMenu({ id: menuId, onSuccess }));
  };
  const handleUpdateMenu = () => {
    dispatch(
      upDateMenu({
        ...upDateMenuData,
        onSuccess,
      })
    );
  };
  const updateMenuImage = async (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      const response = await fetch(`${config.apiBackOfficeUrl}/assets`, {
        method: "POST",
        body: formData,
      });

      const { assetUrl } = await response.json();
      setUpDateMenu({ ...upDateMenuData, assetUrl });
    }
  };
  if (!menu || !upDateMenuData) return null;
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
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Image
          width={140}
          height={160}
          src={menu.assetUrl || "/default-menu.png"}
          alt={"Menu"}
          style={{ borderRadius: 10, marginBottom: 10 }}
        />
        <Button variant="outlined" component="label">
          Update Menu File
          <input type="file" hidden onChange={updateMenuImage} />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          mt: 3,
        }}
      >
        {
          <TextField
            defaultValue={menu.name}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setUpDateMenu({ ...upDateMenuData, name: evt.target.value });
            }}
          ></TextField>
        }
        {
          <TextField
            sx={{ my: 3 }}
            defaultValue={menu.price}
            onChange={(
              evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setUpDateMenu({
                ...upDateMenuData,
                price: Number(evt.target.value),
              });
            }}
          ></TextField>
        }
        <FormControl sx={{ width: 500, mb: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            MenuCategories
          </InputLabel>
          <Select
            sx={{ maxWidth: 500 }}
            id="demo-multiple-checkbox"
            multiple
            value={upDateMenuData.menuCategoryId}
            onChange={handleSelect}
            input={<OutlinedInput label="MenuCategories" />}
            renderValue={(selectedMenuCategoryIds) => {
              return selectedMenuCategoryIds
                .map((selectedMenuCategoryId) => {
                  return menuCategories.find(
                    (item) => item.id === selectedMenuCategoryId
                  ) as Menucategory;
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
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={upDateMenuData.menuCategoryId.includes(item.id)}
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch defaultChecked={upDateMenuData.isAvailable} />}
          label="isAvailable"
          onChange={(evt, value) => {
            setUpDateMenu({ ...upDateMenuData, isAvailable: value });
          }}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ mx: 3 }}
            onClick={() => router.push("/backoffice/menu")}
          >
            Cancel
          </Button>
          <Button
            disabled={
              !upDateMenuData.name || !upDateMenuData.menuCategoryId.length
            }
            variant="contained"
            onClick={handleUpdateMenu}
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
              defaultChecked={upDateMenuData.isAvailable}
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

export default UpdateMenu;
