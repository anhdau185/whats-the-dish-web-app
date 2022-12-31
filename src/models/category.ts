import { Relationship } from './relationship';

interface RawCategoryAttributes {
  name: string;
  title: string;
  description: string | null;
  images: string[];
  dish_ids?: string[];
}

interface CategoryAttributes extends RawCategoryAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export interface RawCategory {
  attributes: RawCategoryAttributes;
}

export interface PartialRawCategory {
  attributes: Partial<RawCategoryAttributes>;
}

export interface Category {
  id: string;
  type?: 'categories';
  attributes: CategoryAttributes;
  relationships?: {
    dishes: Relationship;
  };
}
