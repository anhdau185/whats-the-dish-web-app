import useGetCategoryApi from './useGetCategoryApi';
import useGetDishApi from './useGetDishApi';
import useFetchDishesApi from './useFetchDishesApi';
import useCreateDishApi from './useCreateDishApi';
import useUpdateDishApi from './useUpdateDishApi';
import useDeleteDishApi from './useDeleteDishApi';
import useFetchCategoriesAC from './useFetchCategoriesAC';

export interface ApiHookOptions {
  onSuccess?: (data?: any) => void;
  onFailure?: (error: any) => void;
  onCompletion?: () => void;
}

export {
  useGetCategoryApi,
  useGetDishApi,
  useFetchDishesApi,
  useCreateDishApi,
  useUpdateDishApi,
  useDeleteDishApi,
  useFetchCategoriesAC
};
