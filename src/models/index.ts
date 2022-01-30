import { Category, RawCategory, PartialRawCategory, NullableCategory } from './category';
import { Dish, RawDish, PartialRawDish, NullableDish } from './dish';
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
  PartialRawCategory,
  NullableCategory,
  Dish,
  RawDish,
  PartialRawDish,
  NullableDish,
  HomeItem,
  Relationship
};
