import { DisableLocationMenuCategory } from "@prisma/client";
import { BaseOption } from "./app";

export interface DisableLocationMenuCategorySlice {
  items: DisableLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateDisableLocationMenuCategory extends BaseOption {
  locationId: number;
  menuCategoryId: number;
}
