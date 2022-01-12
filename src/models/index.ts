import { Category, RawCategory, NullableCategory } from './category';
import { Dish, RawDish, NullableDish } from './dish';
import { HomeItem } from './homeItem';

interface Relationship {
  data: {
    id: string;
    type: string;
  }[];
}

export type {
  Category,
  RawCategory,
  NullableCategory,
  Dish,
  RawDish,
  NullableDish,
  HomeItem,
  Relationship
};
