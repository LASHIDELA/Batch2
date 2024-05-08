import { MenuAddonCategory } from "@prisma/client";
import { BaseOption } from "./app";

export interface MenuAddonCategorySlice {
  items: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetMenuAddonCategoryOption extends BaseOption {}
