import { DisableLocationMenu } from "@prisma/client";
import { BaseOption } from "./app";

export interface DisableLocationMenuSlice {
  items: DisableLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateDisableLocationMenu extends BaseOption {
  locationId: number;
  menuCategoryId: number;
}
