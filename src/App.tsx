import "./styles/App.scss";
import {
  CityMap,
  FinishModal,
  PointModal,
  RouteSelector,
  WelcomeScreen,
} from "@/components";
import { useAppEffects } from "@/hooks";
import { useAppSelector, useMainActions } from "@/store/hooks";
import { useState } from "react";

function App() {
  useAppEffects();
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  const { point, route, modalOpen, isFinish } = useAppSelector(
    (state) => state.main,
  );
  const { setPoint, moveToPoint, setModalOpen, setFinish } = useMainActions();

  return (
    <>
      <WelcomeScreen
        open={welcomeOpen}
        onStart={() => setWelcomeOpen(false)}
      />
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
