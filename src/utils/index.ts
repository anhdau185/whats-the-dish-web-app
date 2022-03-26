import isEmpty from 'lodash/fp/isEmpty';

import { Category, Dish } from 'models';

import {
  Nullable,
  OneOrMany,
  RouterIdPageProps,
  BreakpointSet,
  CategoryImages,
  DishImages
} from './types';

export type {
  Nullable,
  OneOrMany,
  RouterIdPageProps,
  BreakpointSet
};

export const getCategoryImages = (category: Category): CategoryImages => {
  const allImages = category.attributes.images;

  if (isEmpty(allImages)) return { categoryAlbum: [] };

  return {
    categoryImage: allImages[0],
    categoryAlbum: allImages.slice(1)
  };
};

export const getDishImages = (dish: Dish): DishImages => {
  const allImages = dish.attributes.images;

  if (isEmpty(allImages)) return { dishAlbum: [] };

  return {
    dishImage: allImages[0],
    dishAlbum: allImages.slice(1)
  };
};
