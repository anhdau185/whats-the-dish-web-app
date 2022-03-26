import { GridSize } from '@material-ui/core';

export type Nullable<T> = T | null;

export interface RouterIdPageProps {
  match: {
    params: { id: string }
  }
}

export interface BreakpointSet {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}

export interface CategoryImages {
  categoryImage?: string;
  categoryAlbum: string[];
}

export interface DishImages {
  dishImage?: string;
  dishAlbum: string[];
}
