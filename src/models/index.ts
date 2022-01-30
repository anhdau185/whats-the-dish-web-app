import { Category, RawCategory, PartialRawCategory } from './category';
import { Dish, RawDish, PartialRawDish } from './dish';
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
  Dish,
  RawDish,
  PartialRawDish,
  HomeItem,
  Relationship
};
