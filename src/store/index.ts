import { configureStore } from "@reduxjs/toolkit";
import addonCategoryReducer from "./slices/addonCategorySlice";
import addonReducer from "./slices/addonSlice";
import appReducer from "./slices/appSlice";
import locationReducer from "./slices/locationSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import menuReducer from "./slices/menuSlice";
import tableReducer from "./slices/tableSlice";
// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    menuCategory: menuCategoryReducer,
    menu: menuReducer,
    addonCategory: addonCategoryReducer,
    addon: addonReducer,
    location: locationReducer,
    table: tableReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
