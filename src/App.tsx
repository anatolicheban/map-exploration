import "./styles/App.scss";
import { CityMap, FinishModal, PointModal, RouteSelector } from "@/components";
import { useAppEffects } from "@/hooks";
import { useAppSelector, useMainActions } from "@/store/hooks";

function App() {
  useAppEffects();

  const { point, route, modalOpen, isFinish } = useAppSelector(
    (state) => state.main,
  );
  const { setPoint, moveToPoint, setModalOpen, setFinish } = useMainActions();

  return (
    <>
      <PointModal
        route={route}
        modalOpen={modalOpen}
        onMoveToPoint={moveToPoint}
        point={point}
        onSetPoint={setPoint}
        onSetModalOpen={setModalOpen}
      />
      <FinishModal open={isFinish} onClose={() => setFinish(false)} />
      <CityMap />
      <RouteSelector />
    </>
  );
}

export default App;
