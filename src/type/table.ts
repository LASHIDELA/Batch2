import { Table } from "@prisma/client";
import { BaseOption } from "./app";

export interface TableSlice {
  items: Table[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateTableOptions extends BaseOption {
  name: string;
  locationId?: number;
}
export interface UpdateTableOptions extends BaseOption {
  id: number;
  name: string;
}
export interface DeleteTableOptions extends BaseOption {
  id: number;
}

export interface GetTableOption extends BaseOption {}
