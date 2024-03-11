import { Table } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface TableSlice {
  items: Table[];
  isLoading: boolean;
  error: Error | null;
}
export interface GetTableOption extends BaseOption {}
