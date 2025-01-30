/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import L from 'leaflet';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { DEFAULT_COORDINATES } from 'src/constants/coordinates';

type MapComponentProps = {
  geom?: any[];
  geoJsons?: any[];
  children?: React.ReactNode;
  useDefaultCoordinates?: boolean;
};

const GeoJsonMapLocal = ({
  geoJsonData,
  padding = [50, 50],
  maxZoom = 5,
  useDefaultCoordinates,
}: any) => {
  const map = useMap();

  useEffect(() => {
    if (geoJsonData) {
      const customBg = geoJsonData['customStyle']?.['bgColor'];
      const geoJSONStyle = {
        color: 'black',
        weight: 1,
        fillColor: customBg ?? '#ffeaa4',
        fillOpacity: 0.4,
      };

      const geoJsonLayer = L.geoJSON(geoJsonData);

      geoJsonLayer.setStyle(geoJSONStyle);

      geoJsonLayer.addTo(map);
      const bounds = geoJsonLayer.getBounds();
      map.flyToBounds(bounds, { padding, maxZoom });
    }

    if (useDefaultCoordinates) {
      map.setView(DEFAULT_COORDINATES);
      map.setZoom(4);
    }
  }, [geoJsonData, map, padding, maxZoom, useDefaultCoordinates]);

  return null;
};

const MapComponent = ({
  geom,
  children,
  geoJsons,
  useDefaultCoordinates,
}: MapComponentProps) => {
  const [geoJSONData, setGeoJSONData] = useState<any>(null);
  const [geoJSONsData, setGeoJSONsData] = useState<any[]>([]);
  const geoJSONRef = useRef<any>(null);

  useEffect(() => {
    const cords = geom?.map(data => {
      if (Array.isArray(data)) {
        return data.map(item => [
          Number(item.latitude),
          Number(item.longitude),
        ]);
      } else {
        return [Number(data.latitude), Number(data.longitude)];
      }
    });

    if (!isEmpty(cords)) {
      geoJSONRef.current?.clearLayers();

      setGeoJSONData({
        type: 'Feature',
        properties: {
          key: Date.now(),
        },
        geometry: {
          type: 'Polygon',
          coordinates: [cords],
        },
      });
    }
  }, [geom]);

  useEffect(() => {
    if (!isEmpty(geoJsons)) {
      setGeoJSONsData(geoJsons as any[]);
    }
  }, [geoJsons]);

  return (
    <MapContainer
      center={DEFAULT_COORDINATES}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!isEmpty(geoJSONData) && (
        <>
          <GeoJsonMapLocal
            geoJsonData={geoJSONData}
            padding={[20, 20]}
            maxZoom={16}
            useDefaultCoordinates={useDefaultCoordinates}
          />
        </>
      )}

      {!isEmpty(geoJsons) && !isEmpty(geoJSONsData) && (
        <>
          {geoJSONsData.map((jsons, idx) => (
            <GeoJsonMapLocal
              key={idx}
              geoJsonData={jsons}
              padding={[20, 20]}
              maxZoom={16}
              useDefaultCoordinates={useDefaultCoordinates}
            />
          ))}
        </>
      )}
      {children ? children : null}
    </MapContainer>
  );
};

export default MapComponent;
