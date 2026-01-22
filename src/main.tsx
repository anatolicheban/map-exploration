import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import "maplibre-gl/dist/maplibre-gl.css";
import { Provider } from "react-redux";
import { store } from "@/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />,
  </Provider>,
);
