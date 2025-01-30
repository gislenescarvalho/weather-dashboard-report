import L from 'leaflet';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

type Props = {
  geoJson: any;
  zoom: number;
};

const TransmissionLinesDashboard = ({ geoJson, zoom }: Props) => {
  const map = useMap();
  const layerGroupRef = useRef<L.LayerGroup | null>(null); // Ref to store the current layer group

  useEffect(() => {
    if (!isEmpty(geoJson)) {
      // Clean up the previous layer group if it exists
      if (layerGroupRef.current) {
        map.removeLayer(layerGroupRef.current);
      }

      // Create a new unique layer group
      const layerGroup = L.layerGroup();

      // Define the style for the GeoJSON features
      const geoJSONStyle = {
        color: 'black',
        weight: 1,
        fill: false,
      };

      // Add each GeoJSON to the layer group
      geoJson.forEach((geoJsonData: any) => {
        const geoJsonLayer = L.geoJSON(geoJsonData, {
          style: geoJSONStyle,
        });
        layerGroup.addLayer(geoJsonLayer);
      });

      // Add the new layer group to the map
      layerGroup.addTo(map);

      // Update the reference
      layerGroupRef.current = layerGroup;

      // Set the zoom level
      map.setZoom(zoom);
    }

    // Clean up when the component unmounts
    return () => {
      if (layerGroupRef.current) {
        map.removeLayer(layerGroupRef.current);
        layerGroupRef.current = null;
      }
    };
  }, [map, geoJson, zoom]);

  return null;
};

export default TransmissionLinesDashboard;
