import { useEffect } from "react";
import { useAppSelector, useMainActions } from "@/store/hooks";
import { MAP_POINTS } from "@/data";

export const useAppEffects = () => {
  const { route } = useAppSelector((state) => state.main);
  const { setPoint } = useMainActions();

  useEffect(() => {
    if (route === null) return;
    setPoint(MAP_POINTS[route][0]);
  }, [route]);
};
