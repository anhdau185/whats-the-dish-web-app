interface RawCategoryAttributes {
  name: string;
  title: string;
  description: string | null;
  images: string[];
}

interface CategoryAttributes extends RawCategoryAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export interface RawCategory {
  attributes: RawCategoryAttributes;
}

export interface Category {
  id: string;
  type?: 'categories';
  attributes: CategoryAttributes;
  relationships?: Record<string, unknown>;
}

export type NullableCategory = Category | null;
