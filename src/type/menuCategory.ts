import { Menucategory } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface MenuCategorySlice {
  items: Menucategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetMenuCategoryOption extends BaseOption {
  name: string;
  locationId: number;
}
