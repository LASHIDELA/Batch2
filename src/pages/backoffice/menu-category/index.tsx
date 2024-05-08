import ItemCard from "@/component/CardItem/ItemCard";
import MenuCategoryDialog from "@/component/dialog/MenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const disableLocaitonMenuCategories = useAppSelector(
    (store) => store.disableLocationMenuCategory.items
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ mt: 2, mr: 2 }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {menuCategories.map((item) => {
            const selectedLocationId = Number(
              localStorage.getItem("LocationId")
            );
            const exit = disableLocaitonMenuCategories.find(
              (disableLocaitonMenuCategory) =>
                disableLocaitonMenuCategory.locationId === selectedLocationId &&
                disableLocaitonMenuCategory.menuCategoryId === item.id
            );
            const isAvailable = exit ? false : true;
            return (
              <ItemCard
                key={item.id}
                icon={<CategoryIcon />}
                href={`/backoffice/menu-category/${item.id}`}
                title={item.name}
                isAvailable={isAvailable}
              />
            );
          })}
        </Box>
        <MenuCategoryDialog open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default MenuCategory;
