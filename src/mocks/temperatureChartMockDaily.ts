import { getLastSevenDays } from 'src/utils/generate-dates';

const dailyCategories = getLastSevenDays();

const temperatureLegend = [
  {
    label: 'Muito baixa',
    description: '(T <= 5)',
    color: '#FF0000',
  },
  {
    label: 'Baixa',
    description: '(5 < T <= 20)',
    color: '#FFCD05',
  },
  {
    label: 'Normal',
    description: '(20 < T <= 35)',
    color: '#00A61C',
  },
  {
    label: 'Alta',
    description: '(35 < T <= 40)',
    color: '#FFCD05',
  },
  {
    label: 'Muito Alta',
    description: '(T > 40)',
    color: '#FF0000',
  },
];

const temperatureDailySeries = [
  {
    name: 'Máxima - Temperatura do Ar (°C)',
    data: [27, 30, 35, 37, 45, 41, 46],
  },
  {
    name: 'Mínima - Temperatura do Ar (°C)',
    data: [12, 15, 14, 15, 25, 10, 0],
  },
];

const temperatureDailyOptions = {
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
    max: 50,
    min: 0,
    tickAmount: 5,
    labels: {
      offsetY: 2,
      offsetX: 2,
    },
  },
  legend: {
    show: false,
    labels: {
      colors: ['#333'],
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'normal',
      colors: ['transparent'],
    },
    formatter: (val: any) => {
      return `${val}°C`;
    },
    background: {
      enabled: true,
      foreColor: '#333',
      padding: 4,
      borderRadius: '50%',
      borderWidth: 2,
      left: 5,
      borderColor: 'transparent',
    },
    offsetY: -5,
  },
  tooltip: {
    enabled: true,
  },
  series: temperatureDailySeries,
};

export { temperatureDailyOptions, temperatureDailySeries, temperatureLegend };
