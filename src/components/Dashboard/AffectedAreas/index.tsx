import L from 'leaflet';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
type Props = {
  geoJson: any;
};

const AffectedAreasDashboard = ({ geoJson }: Props) => {
  const map = useMap();
  const layerGroupRef = useRef<L.LayerGroup | null>(null); // Ref to store the current layer group

  useEffect(() => {
    if (!isEmpty(geoJson)) {
      const geoJSONStyle = {
        color: 'black',
        weight: 1,
        fillOpacity: 0.4,
      };

      if (layerGroupRef.current) {
        map.removeLayer(layerGroupRef.current);
      }

      const layerGroup = L.layerGroup();

      geoJson.forEach((geoJsonData: any) => {
        console.info(geoJsonData);
        const geoJsonLayer = L.geoJSON(geoJsonData);
        geoJsonLayer.setStyle({
          ...geoJSONStyle,
          fillColor: geoJsonData['customStyle']?.['bgColor'],
        });

        const bounds = geoJsonLayer.getBounds();
        map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 10 });
        layerGroup.addLayer(geoJsonLayer);
      });
      layerGroup.addTo(map);
      layerGroupRef.current = layerGroup;
    }
  }, [map, geoJson]);

  return null;
};

export default AffectedAreasDashboard;
