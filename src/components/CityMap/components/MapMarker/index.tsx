import Styles from "./styles.module.scss";
import { type FC, useMemo } from "react";
import { Route, type MapPoint } from "@/types";
import { ROUTES_COLORS, ROUTES_ICONS } from "@/data";
import { useMainActions } from "@/store/hooks";

type Props = {
  point: MapPoint;
  isStart?: boolean;
};

export const MapMarker: FC<Props> = ({ point, isStart }) => {
  const { route } = useMemo(() => point, []);

  const { setPoint } = useMainActions();

  return (
    <div
      onClick={() => {
        // if (point.isFinish) return;
        setPoint(point);
      }}
      style={{
        background: point.isFinish ? "#003fdf" : ROUTES_COLORS[route],
        outline: point.isFinish
          ? `2px solid #003fdf`
          : isStart
            ? `2px solid #62c35b`
            : undefined,
        border: point.isFinish || isStart ? "1px solid #ffffff" : undefined,
      }}
      className={Styles.marker}
    >
      <img
        src={ROUTES_ICONS[point.isFinish ? Route.INTERESTING : route]}
        alt="icon"
      />
    </div>
  );
};
