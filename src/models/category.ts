interface RawCategoryAttributes {
  name: string;
  title: string;
  images: string[];
  description: string | null;
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
  type?: string;
  attributes: CategoryAttributes;
  relationships?: Record<string, unknown>;
}

export type NullableCategory = Category | null;
