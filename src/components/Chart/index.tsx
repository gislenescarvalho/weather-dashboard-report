import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./ChartComponent'), { ssr: false });

export default Chart;
