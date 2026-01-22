export enum Route {
  HISTORICAL,
  INTERESTING,
  MILITARY,
}

export type MapPoint = {
  id: number;
  lng: number;
  lat: number;
  route: Route;
  title: string;
  address?: string;
  desc: string;
  images: string[];
  video?: string;
};

export type RouteDirection = "next" | "prev";
