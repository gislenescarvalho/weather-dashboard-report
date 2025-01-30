import { getLastSevenDays } from 'src/utils/generate-dates';
const dailyCategories = getLastSevenDays();

const humidityLegend = [
  {
    label: 'Prejudicial ao ser humano',
    description: '(0 <= ur <= 25)',
    color: '#FF0000',
  },
  {
    label: 'Normal',
    description: '(25 < ur <= 50)',
    color: '#00A61C',
  },
  {
    label: 'Moderada',
    description: '(50 < ur <= 70)',
    color: '#FFCD05',
  },
  {
    label: 'Alta',
    description: '(70 < ur <= 100)',
    color: '#FF0000',
  },
];

const humidityDailySeries = [
  {
    name: 'Mínima Umidade Relativa do Ar (%)',
    data: [55, 65, 60, 70, 75, 60, 68],
  },
  {
    name: 'Máxima Umidade Relativa do Ar (%)',
    data: [65, 85, 80, 90, 95, 85, 85],
  },
];

const humidityDailyOptions = {
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
          color: '#FFCD05',
          opacity: 1,
        },
        {
          offset: 60,
          color: '#FF0000',
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
    max: 100,
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
      fontSize: '12px',
      fontWeight: 'normal',
      colors: ['transparent'],
    },
    formatter: (val: any) => {
      return `${val} %`;
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
    y: {
      formatter: (value: any) => `${value}%`,
    },
  },
  series: humidityDailySeries,
};

export { humidityDailyOptions, humidityDailySeries, humidityLegend };
