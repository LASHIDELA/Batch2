import { Addon } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface AddonSlice {
  items: Addon[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetAddonOption extends BaseOption {}
