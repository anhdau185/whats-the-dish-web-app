export interface CategoryModel {
  _id?: string;
  name: string;
  title: string;
  description?: string;
  images: string[];
  dishes?: string[];
  createdAt?: Date;
  [extraProps: string]: any;
}

export type NullableCategoryModel = CategoryModel | null;
