import ImageCard from "@/component/CardItem/ImageCard";
import MenuDialog from "@/component/dialog/MenuDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const menus = useAppSelector((store) => store.menu.items);
  const [open, setOpen] = useState<boolean>(false);
  const disableLocationMenus = useAppSelector(
    (store) => store.disableLocationMenu.items
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
          {menus.map((item) => {
            const isAvailable = disableLocationMenus.find(
              (disableLocationMenu) => disableLocationMenu.menuId === item.id
            );
            return (
              <ImageCard
                key={item.id}
                menu={item}
                href={`/backoffice/menu/${item.id}`}
                isAvailable={isAvailable ? false : true}
              />
            );
          })}
        </Box>
        <MenuDialog open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};
export default Menu;
