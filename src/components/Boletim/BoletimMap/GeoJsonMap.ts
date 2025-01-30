/* eslint-disable @typescript-eslint/no-explicit-any */
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { DEFAULT_COORDINATES } from 'src/constants/coordinates';
import { IBoletimActive } from 'src/models/boletim/boletim-active';
import { IGeoJson } from 'src/models/geo-json';

interface GeoJsonMapProps {
  listaGeoJsonData: IGeoJson[];
  padding?: [number, number];
  maxZoom?: number;
  onLatLongSelected?: (lat: number, lng: number) => void;
  hasPin?: boolean;
  activeSelected?: IBoletimActive;
  onClickEvent?: () => void;
  isFilteredList?: boolean;
}

const GeoJsonMap = ({
  listaGeoJsonData,
  padding = [50, 50],
  maxZoom = 100,
  onLatLongSelected,
  hasPin,
  activeSelected,
  onClickEvent,
  isFilteredList,
}: GeoJsonMapProps) => {
  const [marker, setMarker] = useState<L.Marker | null>(null); // Estado para armazenar o marcador criado

  const map = useMapEvents({
    click(e) {
      if (onClickEvent) {
        onClickEvent();
      }
      if (!hasPin || !activeSelected) {
        return;
      }
      // Remover marcador antigo, se existir
      if (marker) {
        marker.remove();
      }

      // Criar um novo marcador na posição clicada
      const newMarker = L.marker(e.latlng).addTo(map);

      // Adicionar um popup ao marcador
      newMarker
        .bindPopup(
          `Você clicou no mapa na LatLng (${e.latlng.lat.toFixed(
            6,
          )}, ${e.latlng.lng.toFixed(6)})`,
        )
        .openPopup();

      setMarker(newMarker); // Atualiza o estado com o novo marcador

      if (onLatLongSelected) {
        onLatLongSelected(e.latlng.lat, e.latlng.lng); // Retorna as coordenadas para o componente pai
      }
    },
  });

  if (activeSelected) {
    const latLongZoom = {
      lat: JSON.parse(activeSelected.coordenadasStringLista)[0][0][1],
      long: JSON.parse(activeSelected.coordenadasStringLista)[0][0][0],
    };
    map.setView([latLongZoom.lat, latLongZoom.long], 10);
  }

  useEffect(() => {
    if (listaGeoJsonData.length > 0) {
      // Remove camadas GeoJSON anteriores
      map.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
        }
      });

      map.setZoom(maxZoom);
      if (!isFilteredList) {
        map.setView(DEFAULT_COORDINATES);
      }
      if (isFilteredList) {
        const bounds = listaGeoJsonData[0].geometry.coordinates[0].map(
          (coord: number[]) => [coord[1], coord[0]] as [number, number],
        );
        map.fitBounds(bounds);
      }

      const geoJSONStyle = {
        color: 'black',
        weight: 1,
        fill: false,
      };

      const layerGroup = L.layerGroup().addTo(map);

      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      listaGeoJsonData.forEach((geoJsonData: any) => {
        // Adiciona nova camada GeoJSON

        if (geoJsonData?.properties?.image) {
          const customIcon = L.icon({
            iconUrl: geoJsonData?.properties?.image, // URL to your PNG image
            iconSize: [32, 32], // Size of the icon [width, height]
            iconAnchor: [16, 32], // Anchor point of the icon (center bottom)
            popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
          });
          const marker = L.marker(
            [
              geoJsonData.geometry.coordinates[1],
              geoJsonData.geometry.coordinates[0],
            ],
            { icon: customIcon },
          );

          // marker.addTo(map);
          layerGroup.addLayer(marker);
        } else {
          const geoJsonLayer = L.geoJSON(geoJsonData);
          geoJsonLayer.setStyle(geoJSONStyle);
          // geoJsonLayer.addTo(map);
          layerGroup.addLayer(geoJsonLayer);
        }
      });

      layerGroup.addTo(map);
    }
  }, [listaGeoJsonData, map, padding, maxZoom, isFilteredList]);

  return null; // Nenhum elemento JSX é necessário
};

export default GeoJsonMap;
