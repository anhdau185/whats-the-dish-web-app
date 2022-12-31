import { AxiosResponse } from 'axios';

import { Category, Dish } from 'models';

export interface CommonApiResponse {
  data?: OneOrMany<Category> | OneOrMany<Dish>;
  included?: Category[] | Dish[];
  [extraProps: string]: unknown;
}

export type ApiCallPromise<
  T extends CommonApiResponse = CommonApiResponse
> = Promise<AxiosResponse<T>>;


export interface FetchCategoriesApiOptions {
  include_dishes?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

export interface GetCategoryApiOptions {
  include_dishes?: boolean;
}

export interface CategoryCollectionApiResponse extends CommonApiResponse {
  data: Category[];
  included?: Dish[];
}

export interface SingleCategoryApiResponse extends CommonApiResponse {
  data: Category;
  included?: Dish[];
}

export interface FetchDishesApiOptions {
  include_categories?: boolean;
  order_by?: 'name' | 'title' | 'created_at' | 'updated_at';
  order_direction?: 'asc' | 'desc';
}

export interface GetDishApiOptions {
  include_categories?: boolean;
}

export interface DishCollectionApiResponse extends CommonApiResponse {
  data: Dish[];
  included?: Category[];
}

export interface SingleDishApiResponse extends CommonApiResponse {
  data: Dish;
  included?: Category[];
}
