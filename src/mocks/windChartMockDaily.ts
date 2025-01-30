import { getLastSevenDays } from 'src/utils/generate-dates';

const dailyCategories = getLastSevenDays();

const windLegend = [
  {
    label: 'Fraca',
    description: '(0 < V <= 19)',
    color: '#00A61C',
  },
  {
    label: 'Moderada',
    description: '(19 < V <= 49)',
    color: '#FFCD05',
  },
  {
    label: 'Forte',
    description: '(V > 50)',
    color: '#FF0000',
  },
];

const windDailySeries = [
  {
    name: 'Média (Rajada) - Intensidade do Vento (km/h)',
    data: [0, 15, 25, 30, 40, 45, 50],
  },
  {
    name: 'Máxima (Rajada) - Intensidade do Vento (km/h)',
    data: [10, 30, 55, 66, 70, 64, 60],
  },
];

const windDailyOptions = {
  chart: {
    type: 'line',
    height: 465,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    panning: {
      enabled: false,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 10,
          color: '#FF0000',
          opacity: 1,
        },
        {
          offset: 60,
          color: '#FFCD05',
          opacity: 1,
        },
        {
          offset: 85,
          color: '#00A61C',
          opacity: 1,
        },
      ],
    },
  },
  grid: {
    show: true,
    borderColor: '#D8E0E3',
    strokeDashArray: 1,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 15,
      bottom: 0,
      left: 15,
    },
  },
  xaxis: {
    categories: dailyCategories,
    labels: {
      rotate: 0,
      style: {
        fontSize: '12px',
      },
      offsetY: 2,
      offsetX: 2,
    },
  },
  yaxis: {
    max: 80,
    min: 0,
    tickAmount: 10,
    labels: {
      offsetY: 2,
      offsetX: 2,
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '10px',
      fontWeight: 'normal',
      colors: ['transparent'],
    },
    formatter: (val: any) => {
      return `${val} km/h`;
    },
    background: {
      enabled: true,
      foreColor: '#333',
      padding: 0,
      borderRadius: '50%',
      borderWidth: 2,
      left: 0,
      right: 10,
      borderColor: 'transparent',
    },
    offsetX: 0,
    offsetY: -5,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (value: any) => `${value}km/h`,
    },
  },
  series: windDailySeries,
};

export { windDailyOptions, windDailySeries, windLegend };
