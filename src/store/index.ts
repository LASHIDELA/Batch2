import { configureStore } from "@reduxjs/toolkit";
import addonCategoryReducer from "./slices/addonCategorySlice";
import addonReducer from "./slices/addonSlice";
import appReducer from "./slices/appSlice";
import cartReducer from "./slices/cartSlice";
import companyReducer from "./slices/companySlice";
import disableLocationMenuCategoryReducer from "./slices/disableLocationMenuCategorySlice";
import disableLocationMenuReducer from "./slices/disableLocationMenuSlice";
import locationReducer from "./slices/locationSlice";
import menuAddonCategoryReducer from "./slices/menuAddonCategorySlice";
import menuCategoryMenu from "./slices/menuCategoryMenu";
import menuCategoryReducer from "./slices/menuCategorySlice";
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";
import snackBarReducer from "./slices/snackBarSlice";
import tableReducer from "./slices/tableSlice";
// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    menuCategory: menuCategoryReducer,
    menu: menuReducer,
    menuCategoryMenu: menuCategoryMenu,
    addonCategory: addonCategoryReducer,
    menuAddonCategory: menuAddonCategoryReducer,
    addon: addonReducer,
    table: tableReducer,
    snackBar: snackBarReducer,
    location: locationReducer,
    disableLocationMenu: disableLocationMenuReducer,
    disableLocationMenuCategory: disableLocationMenuCategoryReducer,
    cart: cartReducer,
    order: orderReducer,
    company: companyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
