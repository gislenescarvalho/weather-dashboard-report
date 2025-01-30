const windHourlyLegend = [
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

const windHourlySeries = [
  {
    name: 'Média(Rajada) - Intensidade do Vento (km/h)',
    data: [5, 5, 5, 5, 10, 10, 20, 25, 30, 40, 45, 25, 30, 30, 40],
  },
  {
    name: 'Máxima(Rajada) - Intensidade do Vento (km/h)',
    data: [10, 10, 10, 10, 25, 30, 40, 40, 40, 70, 80, 65, 50, 50, 80],
  },
];

const windHourlyOptions = {
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
  xaxis: {
    categories: [
      '09 h',
      '10 h',
      '11 h',
      '12 h',
      '13 h',
      '14 h',
      '15 h',
      '16 h',
      '17 h',
      '18 h',
      '19 h',
      '20 h',
      '21 h',
      '22 h',
      '23 h',
    ],
    labels: {
      rotate: 0,
      style: {
        fontSize: '14px',
        fontFamily: 'Prompt',
        lineHeight: '16.8px',
        fontWeight: '400',
        color: 'var(--color-base-black)',
      },
      offsetY: 4,
      offsetX: 2,
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
      right: 30,
      bottom: 0,
      left: 30,
    },
  },
  yaxis: {
    max: 80,
    min: 0,
    tickAmount: 10,
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Prompt',
        lineHeight: '16.8px',
        fontWeight: '400',
        color: 'var(--color-base-black)',
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'normal',
      colors: ['transparent'],
    },
    formatter: (val: any) => {
      return `${val} km/h`;
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
      formatter: (value: any) => `${value}km/h`,
    },
  },
  series: windHourlySeries,
};

export { windHourlyLegend, windHourlyOptions, windHourlySeries };
