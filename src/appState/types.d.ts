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

export declare interface ApiCallsState {
  fetchCategories: FetchCategoriesApiCall;
  fetchDishes: FetchDishesApiCall;
}

export declare interface AppState {
  appLoading: boolean;
  apiCalls: ApiCallsState;
  pinging: boolean;
}
