import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { mainSlice } from "@/store/mainSlice.ts";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMainActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators({ ...mainSlice.actions }, dispatch);
};
