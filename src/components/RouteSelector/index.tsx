import Styles from "./styles.module.scss";
import { Route } from "@/types";
import { ROUTES_COLORS, ROUTES_ICONS } from "@/data";
import { useMainActions } from "@/store/hooks";

type RouteOption = {
  label: string;
  value: Route;
};

const routeOptions: RouteOption[] = [
  { label: "Історичний", value: Route.HISTORICAL },
  { label: "Окупація", value: Route.MILITARY },
  { label: "Цікавинки", value: Route.INTERESTING },
];

export const RouteSelector = () => {
  const { setRoute } = useMainActions();

  return (
    <div className={Styles.mapSelector}>
      <h2>Вибери маршрут: </h2>
      <div className={Styles.wrapper}>
        {routeOptions.map((el) => (
          <div
            onClick={() => setRoute(el.value)}
            style={{
              background: ROUTES_COLORS[el.value],
            }}
            key={el.value}
          >
            <img src={ROUTES_ICONS[el.value]} alt="" />
            <span> {el.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
