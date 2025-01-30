import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useMemo, useState } from 'react';

export type ChartDataProps = ApexOptions;

type ChartProps = {
  id: string;
  data: ApexOptions;
};

const ChartComponent = ({ data, id }: ChartProps) => {
  const hash = useMemo(() => Date.now(), []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indicate that we are in the client environment
  }, []);

  useEffect(() => {
    if (isClient) {
      const chart = new ApexCharts(
        document.querySelector(`#chart-${hash}-${id}`),
        data,
      );

      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data, hash, id, isClient]);

  return <div id={`chart-${hash}-${id}`} />;
};

export default ChartComponent;
