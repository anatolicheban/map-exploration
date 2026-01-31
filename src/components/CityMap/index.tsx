import Styles from "./styles.module.scss";
import Map, { Marker, Layer, Source } from "react-map-gl/maplibre";
import { type FC, Fragment, useEffect, useRef, useState } from "react";
import { MAP_POINTS, ROUTES_COLORS } from "@/data";
import { MapMarker } from "@components/CityMap/components";
import { buildRouteLine } from "@/utils";
import type { MapRef } from "react-map-gl/mapbox-legacy";
import { useAppSelector, useMainActions } from "@/store/hooks";

type Props = {
  center?: { lng: number; lat: number };
  zoom?: number;
};

const OSM_RASTER_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
} as const;

export const CityMap: FC<Props> = ({
  center = { lng: 29.93281740713698, lat: 50.6414228448425 },
  zoom = 12.7,
}) => {
  const mapRef = useRef<MapRef>(null);
  const { point, isFinish } = useAppSelector((state) => state.main);
  const { setModalOpen } = useMainActions();

  const [mapAvailable, setMapAvailable] = useState(true);

  useEffect(() => {
    if (!mapRef.current || !point) return;

    const map = mapRef.current.getMap();

    const handleStart = () => {
      setMapAvailable(false);
      setModalOpen(false);
    };

    const handleEnd = () => {
      setMapAvailable(true);
      setModalOpen(true);
    };

    map.once("movestart", handleStart);
    map.once("moveend", handleEnd);

    mapRef.current.flyTo({
      center: [point.lng, point.lat],
      zoom: 15,
      duration: 1000,
    });
  }, [point]);

  useEffect(() => {
    if (!mapRef.current || !isFinish) return;

    mapRef.current.flyTo({
      center: [center.lng, center.lat],
      zoom: zoom,
      speed: 0.8,
    });
  }, [isFinish]);

  return (
    <div
      className={Styles.map}
      style={{
        pointerEvents: !mapAvailable ? "none" : undefined,
      }}
    >
      <Map
        //@ts-ignore
        ref={mapRef}
        initialViewState={{ longitude: center.lng, latitude: center.lat, zoom }}
        //@ts-ignore
        mapStyle={OSM_RASTER_STYLE}
      >
        {Object.entries(MAP_POINTS).map(([route, points]) => {
          if (!points.length) return;

          const geoFeature = buildRouteLine(points);

          return (
            <Fragment key={route}>
              <Source
                id={`route-${route}`}
                type="geojson"
                //@ts-ignore
                data={geoFeature}
              >
                <Layer
                  id={`route-${route}`}
                  type="line"
                  paint={{
                    //@ts-ignore
                    "line-color": ROUTES_COLORS[route],
                    "line-width": 3,
                    "line-opacity": 0.9,
                  }}
                />
              </Source>
              {points.map((el, i) => {
                return (
                  <Marker key={i} longitude={el.lng} latitude={el.lat}>
                    <MapMarker isStart={i === 0} point={el} />
                  </Marker>
                );
              })}
            </Fragment>
          );
        })}
      </Map>
    </div>
  );
};
