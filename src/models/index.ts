export interface CategoryModel {
  id?: string;
  type?: string;
  attributes: {
    name: string;
    title: string;
    images: string[];
    description: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  };
  relationships?: Record<string, any>;
}

export type NullableCategoryModel = CategoryModel | null;
