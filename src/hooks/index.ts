import useGetCategoryApi from './useGetCategoryApi';
import useGetDishApi from './useGetDishApi';
import useFetchDishesApi from './useFetchDishesApi';
import useCreateDishApi from './useCreateDishApi';
import useUpdateDishApi from './useUpdateDishApi';

export interface ApiHookOptions {
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
  onCompletion?: () => void;
}

export {
  useGetCategoryApi,
  useGetDishApi,
  useFetchDishesApi,
  useCreateDishApi,
  useUpdateDishApi
};
