import { Category, Dish } from 'models';

export declare interface FetchCategoriesApiCall {
  data: Category[];
  includedData?: Dish[];
  error: any;
  loading: boolean;
}

export declare interface FetchDishesApiCall {
  data: Dish[];
  includedData?: Category[];
  error: any;
  loading: boolean;
}

export declare interface AppState {
  appLoading: boolean;
  fetchCategoriesApiCall: FetchCategoriesApiCall;
  fetchDishesApiCall: FetchDishesApiCall;
  pinging: boolean;
}
