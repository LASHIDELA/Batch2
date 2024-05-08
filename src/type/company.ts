import { Company } from "@prisma/client";
import { BaseOption } from "./app";

export interface CompanyOption {
  item: Company | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateCompanyOptions extends BaseOption {
  id: number;
  name: string;
  street: string;
  townShip: string;
  city: string;
}

export interface GetTableOption extends BaseOption {}
