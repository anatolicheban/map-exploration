import Styles from "./styles.module.scss";
import { type FC, useMemo } from "react";
import { type MapPoint } from "@/types";
import { ROUTES_COLORS, ROUTES_ICONS } from "@/data";
import { useMainActions } from "@/store/hooks";

type Props = {
  point: MapPoint;
  isStart?: boolean;
  isEnd?: boolean;
};

export const MapMarker: FC<Props> = ({ point, isStart, isEnd }) => {
  const { route } = useMemo(() => point, []);

  const { setPoint } = useMainActions();

  return (
    <div
      onClick={() => setPoint(point)}
      style={{
        background: ROUTES_COLORS[route],
        outline:
          isStart || isEnd
            ? `2px solid ${isStart ? "#62c35b" : "#ec2d2d"}`
            : undefined,
        border: isStart || isEnd ? "1px solid #ffffff" : undefined,
      }}
      className={Styles.marker}
    >
      <img src={ROUTES_ICONS[route]} alt="icon" />
    </div>
  );
};
