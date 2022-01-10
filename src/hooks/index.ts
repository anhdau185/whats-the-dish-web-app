import useFetchCategoriesApi from './useFetchCategoriesApi';
import useFetchDishesApi from './useFetchDishesApi';
import useCreateCategoryApi from './useCreateCategoryApi';
import useCreateDishApi from './useCreateDishApi';
import useGetCategoryApi from './useGetCategoryApi';
import useGetDishApi from './useGetDishApi';
import useUpdateCategoryApi from './useUpdateCategoryApi';
import useUpdateDishApi from './useUpdateDishApi';
import useDeleteCategoryApi from './useDeleteCategoryApi';
import useDeleteDishApi from './useDeleteDishApi';

export interface ApiHookOptions {
  onSuccess?: (data?: any) => void;
  onFailure?: (error: any) => void;
  onCompletion?: () => void;
}

export {
  useFetchCategoriesApi,
  useFetchDishesApi,
  useCreateCategoryApi,
  useCreateDishApi,
  useGetCategoryApi,
  useGetDishApi,
  useUpdateCategoryApi,
  useUpdateDishApi,
  useDeleteCategoryApi,
  useDeleteDishApi
};
