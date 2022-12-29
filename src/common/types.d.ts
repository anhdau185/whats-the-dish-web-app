import { GridSize } from '@material-ui/core';

export declare interface RouterIdPageProps {
  match: {
    params: { id: string }
  }
}

export declare interface BreakpointSet {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}

export declare interface CategoryImages {
  categoryImage?: string;
  categoryAlbum: string[];
}

export declare interface DishImages {
  dishImage?: string;
  dishAlbum: string[];
}
