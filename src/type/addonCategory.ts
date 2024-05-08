import { AddonCategory } from "@prisma/client";
import { BaseOption } from "./app";

export interface AddonCategorySlice {
  items: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateAddonCategory extends BaseOption {
  name: string;
  isRequired: boolean;
  menuIds: number[];
}
export interface UpdateAddonCategory extends BaseOption {
  id: number;
  name: string;
  isRequired: boolean;
  menuIds: number[];
}
export interface RemoveAddonCategory extends BaseOption {
  id: number;
}
export interface GetAddonCategoryOption extends BaseOption {}
