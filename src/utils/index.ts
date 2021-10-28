import isEmpty from 'lodash/fp/isEmpty';

import { Category, Dish } from 'models';

export interface EmptyProps {
  [props: string]: never;
}

export interface RouterIdPageProps {
  match: {
    params: { id: string }
  }
}

interface CategoryImages {
  categoryImage?: string;
  categoryAlbum: string[];
}

interface DishImages {
  dishImage?: string;
  dishAlbum: string[];
}

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
