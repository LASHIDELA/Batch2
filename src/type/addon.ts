import { Addon } from "@prisma/client";
import { BaseOption } from "./app";

export interface AddonSlice {
  items: Addon[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateAddonOption extends BaseOption {
  name: string;
  price: number;
  addonCategoryId: number;
}
export interface UpdateAddonOption extends BaseOption {
  id: number;
  name: string;
  price: number;
  addonCategoryId?: number;
}
export interface RemoveAddonOption extends BaseOption {
  id: number;
}
export interface GetAddonOption extends BaseOption {}
