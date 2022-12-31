import { Relationship } from './relationship';

interface RawDishAttributes {
  name: string;
  title: string;
  description: string | null;
  images: string[];
  places?: string[];
}

interface DishAttributes extends RawDishAttributes {
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RawDish {
  attributes: RawDishAttributes;
}

export interface PartialRawDish {
  attributes: Partial<RawDishAttributes>;
}

export interface Dish {
  id: string;
  type?: 'dishes';
  attributes: DishAttributes;
  relationships?: {
    categories: Relationship;
  };
}
