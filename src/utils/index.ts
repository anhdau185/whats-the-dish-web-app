import isEmpty from 'lodash/fp/isEmpty';

import { Category } from 'models';

export interface EmptyProps {
  [props: string]: never;
}

interface CategoryImages {
  categoryImage?: string;
  categoryAlbum: string[];
}

export const getCategoryImages = (category: Category): CategoryImages => {
  const allImages = category.attributes.images;

  if (isEmpty(allImages)) return { categoryAlbum: [] };

  return {
    categoryImage: allImages[0],
    categoryAlbum: allImages.slice(1)
  };
};
