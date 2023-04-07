import {KtdGridLayout} from "@katoid/angular-grid-layout";

export interface GifItem {
  id: string;
  name: string;
  url: string,
  added: number,
  draggingOver?: boolean,
  x: number
  y: number,
  w: number,
  h: number,
  minW?: number,
  maxW?: number,
  minH?: number,
  maxH?: number,

}
