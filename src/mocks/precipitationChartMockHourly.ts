const precipitationHourlyLegend = [
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
    description: '(Precipitação > 60)',
    color: '#5D00FF',
  },
];

const precipitationHourlySeries = [
  {
    name: 'Precipitação (mm)',
    data: [5, 10, 10, 5, 10, 10, 20, 25, 20, 30, 40, 50, 60, 70, 80],
  },
];

const precipitationHourlyOptions = {
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
  series: precipitationHourlySeries,
};

export {
  precipitationHourlyLegend,
  precipitationHourlyOptions,
  precipitationHourlySeries,
};
