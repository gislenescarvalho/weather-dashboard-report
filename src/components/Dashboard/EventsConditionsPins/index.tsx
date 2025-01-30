import L from 'leaflet';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
type Props = {
  geoJson: any;
  zoom: number;
};

const EventsConditionsPinsDashboard = ({ geoJson, zoom }: Props) => {
  const map = useMap();
  const layerGroupRef = useRef<L.LayerGroup | null>(null); // Ref to store the current layer group

  useEffect(() => {
    if (!isEmpty(geoJson)) {
      map.setZoom(zoom);

      if (layerGroupRef.current) {
        map.removeLayer(layerGroupRef.current);
      }

      const layerGroup = L.layerGroup();

      geoJson.forEach((geoJsonData: any) => {
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
        layerGroup.addLayer(marker);
      });

      layerGroup.addTo(map);
      layerGroupRef.current = layerGroup;
    }
  }, [map, geoJson, zoom]);

  return null;
};

export default EventsConditionsPinsDashboard;
