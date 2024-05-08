import AddonCategoriesDetail from "@/component/AddonCategories";
import Quantity from "@/component/Quantity";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem } from "@/store/slices/cartSlice";

import { Box, Button } from "@mui/material";
import { Addon } from "@prisma/client";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetail = () => {
  const dispatch = useAppDispatch();
  const { query, isReady, ...router } = useRouter();
  const menuId = Number(query.id);
  const cartItemId = query.cartItemId;
  const cartItems = useAppSelector((store) => store.cart.items);
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const menus = useAppSelector((store) => store.menu.items).filter(
    (item) => item.id === menuId
  );
  const menu = menus.find((item) => item.id === menuId);

  const addonCategoryIds = useAppSelector(
    (store) => store.menuAddonCategory.items
  )
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);
  const addonCategories = useAppSelector(
    (store) => store.addonCategory.items
  ).filter((item) => addonCategoryIds.includes(item.id));
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantityValue, setQuantityValue] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleDecreace = () => {
    const values = quantityValue - 1 === 0 ? 1 : quantityValue - 1;
    setQuantityValue(values);
  };
  const handleIncreace = () => {
    const values = quantityValue + 1;
    setQuantityValue(values);
  };
  const handleCreateCartItem = () => {
    if (!menu) return null;
    const cartItemDatas = {
      menu,
      quantity: quantityValue,
      id: cartItem ? cartItem.id : nanoid(7),
      addon: selectedAddons,
    };
    dispatch(addCartItem(cartItemDatas));
    const pathname = cartItem ? "/order/cart" : "/order";
    router.push({ pathname, query });
  };

  useEffect(() => {
    const allAddonCategories = addonCategories.filter(
      (item) => item.isRequired
    );
    const filterAddonCategory = selectedAddons.filter((selectedAddon) =>
      addonCategories.find((item) => item.id === selectedAddon.addonCategoryId)
        .isRequired
        ? true
        : false
    );
    const addonQuantity =
      allAddonCategories.length === filterAddonCategory.length ? false : true;
    setIsDisabled(addonQuantity);
  }, [selectedAddons, addonCategories]);
  useEffect(() => {
    if (cartItemId) {
      const cartItem = cartItems.find((item) => item.id === cartItemId);
      if (cartItem) {
        const { addon, quantity } = cartItem;
        setSelectedAddons(addon);
        setQuantityValue(quantity);
      }
    }
  }, [cartItemId]);
  if (!menu) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          top: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {menus.map((item) => (
          <Box key={item.id} sx={{ display: "flex", flexDirection: "column" }}>
            <Image
              width={140}
              height={140}
              src={item.assetUrl || "/default-menu.png"}
              alt={"Menu"}
              style={{ borderRadius: "50%" }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
              {" "}
              {item.name}
            </Box>
          </Box>
        ))}

        <AddonCategoriesDetail
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
          addonCategories={addonCategories}
          menuId={menuId}
        />
        <Quantity
          handleDecreace={handleDecreace}
          handleIncreace={handleIncreace}
          quantityValue={quantityValue}
        />
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCreateCartItem}
            disabled={isDisabled}
          >
            {cartItem ? "Update" : "Add To Cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default MenuDetail;
