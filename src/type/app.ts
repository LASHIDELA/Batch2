export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface AppSlice {
  init: boolean;
  isLoading: boolean;
  error: Error | null;
}
export interface GetAppOption extends BaseOption {}
