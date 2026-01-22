import { configureStore } from "@reduxjs/toolkit";
import { mainSlice } from "@/store/mainSlice.ts";

export const store = configureStore({
  reducer: {
    [mainSlice.name]: mainSlice.reducer,
  },
  devTools: true,
  middleware: (d) => d({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
