import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type MapPoint, Route } from "@/types";
import { MAP_POINTS } from "@/data";

type MainSlice = {
  point: null | MapPoint;
  route: Route | null;
  modalOpen: boolean;
  isFinish: boolean;
};

const initialState: MainSlice = {
  point: null,
  route: null,
  modalOpen: false,
  isFinish: false,
};

export const mainSlice = createSlice({
  initialState,
  name: "main",
  reducers: {
    setPoint(state, action: PayloadAction<MapPoint | null>) {
      state.point = action.payload;
    },
    setRoute(state, action: PayloadAction<Route | null>) {
      state.route = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    setFinish(state, action: PayloadAction<boolean>) {
      state.isFinish = action.payload;
    },
    moveToPoint(state, { payload: direction }: PayloadAction<"prev" | "next">) {
      if (state.route === null || !state.point) return;

      const routeArray = MAP_POINTS[state.route];

      const currentPointIndex = routeArray.findIndex(
        (el) => el.id === state.point?.id,
      );

      if (direction === "prev") {
        if (currentPointIndex === 0) return;
        state.point = routeArray[currentPointIndex - 1];
      } else {
        if (currentPointIndex + 1 === routeArray.length) {
          // state.isFinish = true;
          state.point = null;
          state.modalOpen = false;
          state.route = null;
          return;
        }
        state.point = routeArray[currentPointIndex + 1];
      }
    },
  },
});
