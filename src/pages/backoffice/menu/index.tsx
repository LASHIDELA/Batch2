import ItemCard from "@/component/CardItem/ItemCard";
import MenuDialog from "@/component/dialog/MenuDialog";
import { useAppSelector } from "@/store/hooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const menus = useAppSelector((store) => store.menu.items);
  const [open, setOpen] = useState<boolean>(false);

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
          {menus.map((item) => (
            <ItemCard
              key={item.id}
              icon={<MenuBookIcon />}
              href={`/backoffice/menu/${item.id}`}
              title={item.name}
            />
          ))}
        </Box>
        <MenuDialog open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};
export default Menu;
