import { Location } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface LocationSlice {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetLocationOption extends BaseOption {
  name: string;
  companyId: number;
}
