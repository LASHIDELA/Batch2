import { MenuCategoryMenu } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface MenuCategoryMenuSlice {
  items: MenuCategoryMenu[];
  isLoading: boolean;
  error: Error | null;
}
