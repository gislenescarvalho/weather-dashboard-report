import { getLastSevenDays } from 'src/utils/generate-dates';

const dailyCategories = getLastSevenDays();

const precipitationLegend = [
  {
    label: 'Sem chuva',
    description: '(Precipitação = 0)',
    color: '#5D00FF',
  },
  {
    label: 'Fraca',
    description: '(0 < Precipitação <= 5)',
    color: '#FFCD05',
  },
  {
    label: 'Moderada',
    description: '(5 < Precipitação <= 60)',
    color: '#FF7903',
  },
  {
    label: 'Forte',
    description: '(35 < Precipitação <= 60)',
    color: '#FF0000',
  },
  {
    label: 'Muito Forte',
    description: '(Precipitação < 60)',
    color: '#5D00FF',
  },
];

const precipitationDailySeries = [
  {
    name: 'Precipitação (mm)',
    data: [0, 14, 25, 14, 10, 2, 0],
  },
];

const precipitationDailyOptions = {
  chart: {
    type: 'bar',
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
          color: '#5D00FF',
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
      offsetX: 2,
      offsetY: 2,
    },
  },
  legend: {
    show: true,
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
      return `${val} mm`;
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
      formatter: (value: any) => `${value}mm`,
    },
  },
  series: precipitationDailySeries,
};

export {
  precipitationDailyOptions,
  precipitationDailySeries,
  precipitationLegend,
};
