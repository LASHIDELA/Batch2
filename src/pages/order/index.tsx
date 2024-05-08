import ImageCard from "@/component/CardItem/ImageCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Tab, Tabs } from "@mui/material";
import { Menucategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Order = () => {
  const { isReady, ...router } = useRouter();
  const query = router.query;
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menus = useAppSelector((store) => store.menu.items);
  const [menuCategoryData, setMenuCategoryData] = useState<Menucategory>();
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );

  const menuId = menuCategoryMenus
    .filter(
      (menuCategoryMenu) =>
        menuCategoryMenu.menuCategoryId === menuCategoryData?.id
    )
    .map((item) => item.menuId);
  const validMenus = menus.filter((item) => menuId.includes(item.id));

  useEffect(() => {
    if (menuCategories.length) {
      setMenuCategoryData(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenu = () => {
    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return (
        <Box key={item.id} sx={{ mt: 2 }}>
          {<ImageCard menu={item} href={href} />}
        </Box>
      );
    });
  };
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Menu Category"
          TabIndicatorProps={{ style: { background: "#1B9CB5" } }}
          sx={{ ".Mui-selected": { color: "#1B9CB5", fontWeight: "bold" } }}
          variant="scrollable"
        >
          {menuCategories.map((item) => {
            return (
              <Tab
                key={item.id}
                label={item.name}
                onClick={() => {
                  setMenuCategoryData(item);
                }}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{renderMenu()}</Box>
    </Box>
  );
};
export default Order;
