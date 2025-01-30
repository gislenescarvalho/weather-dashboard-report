const precipitationConfig = {
  id: 'precipitation',
  type: 'bar',
  titleDaily: 'Previsão de precipitação acumulada por dia (mm)',
  titleHourly: 'Precipitação (mm)',
  /*colorStops: [
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
  ],*/
  yAxis: {
    min: 0,
    max: (num: any) => {
      return Math.ceil(num / 100) * 100 > num
        ? Math.ceil(num / 100) * 100
        : num;
    },
    tickAmount: 10,
    labels: {
      offsetX: 2,
      offsetY: 2,
      style: {
        fontSize: '14px',
        fontFamily: "'Prompt', sans-serif",
        lineHeight: '16.8px',
        fontWeight: '400',
        color: 'var(--color-base-black)',
      },
    },
  },
  legendDaily: [
    {
      label: 'Fraca',
      description: '(0 < Precipitação <= 10)',
      //color: '#FFCD05',
      color: null,
    },
    {
      label: 'Moderada',
      description: '(10 < Precipitação <= 40)',
      //color: '#FF7903',
      color: null,
    },
    {
      label: 'Forte',
      description: '(40 < Precipitação <= 60)',
      //color: '#FF0000',
      color: null,
    },
    {
      label: 'Muito Forte',
      description: '(Precipitação > 60)',
      //color: '#5D00FF',
      color: null,
    },
  ],
  legendHourly: [
    {
      label: 'Fraca',
      description: '(0 < Precipitação <= 2,5)',
      //color: '#FFCD05',
      color: null,
    },
    {
      label: 'Moderada',
      description: '(2,5 < Precipitação <= 10)',
      //color: '#FF7903',
      color: null,
    },
    {
      label: 'Forte',
      description: '(10 < Precipitação <= 50)',
      //color: '#FF0000',
      color: null,
    },
    {
      label: 'Muito Forte',
      description: '(Precipitação > 50)',
      //color: '#5D00FF',
      color: null,
    },
  ],
};

const temperatureConfig = {
  id: 'temperature',
  titleDaily: 'Temperatura do Ar (°C)',
  titleHourly: null,
  type: 'line',
  /*colorStops: [
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
  ],*/
  yAxis: {
    max: 50,
    min: 0,
    tickAmount: 5,
    labels: {
      offsetY: 2,
      offsetX: 2,
      style: {
        fontSize: '14px',
        fontFamily: "'Prompt', sans-serif",
        lineHeight: '16.8px',
        fontWeight: '400',
        color: 'var(--color-base-black)',
      },
    },
  },
  legendDaily: [
    {
      label: 'Muito baixa',
      description: '(T <= 5)',
      //color: '#FF0000',
      color: null,
    },
    {
      label: 'Baixa',
      description: '(5 < T <= 20)',
      //color: '#FFCD05',
      color: null,
    },
    {
      label: 'Normal',
      description: '(20 < T <= 35)',
      //color: '#00A61C',
      color: null,
    },
    {
      label: 'Alta',
      description: '(35 < T <= 40)',
      //color: '#FFCD05',
      color: null,
    },
    {
      label: 'Muito Alta',
      description: '(T > 40)',
      //color: '#FF0000',
      color: null,
    },
  ],
  legendHourly: null,
};

const humidityConfig = {
  id: 'humidity',
  titleDaily: 'Umidade Relativa do Ar (%)',
  titleHourly: null,
  type: 'line',
  /*colorStops: [
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
  ],*/
  yAxis: {
    max: 100,
    min: 0,
    tickAmount: 10,
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: "'Prompt', sans-serif",
        lineHeight: '16.8px',
        fontWeight: '400',
        color: 'var(--color-base-black)',
      },
      offsetY: 2,
      offsetX: 2,
    },
  },
  legendDaily: [
    {
      label: 'Prejudicial ao ser humano',
      description: '(0 <= ur <= 25)',
      //color: '#FF0000',
      color: null,
    },
    {
      label: 'Normal',
      description: '(25 < ur <= 50)',
      //color: '#00A61C',
      color: null,
    },
    {
      label: 'Moderada',
      description: '(50 < ur <= 70)',
      //color: '#FFCD05',
      color: null,
    },
    {
      label: 'Alta',
      description: '(70 < ur <= 100)',
      //color: '#FF0000',
      color: null,
    },
  ],
  legendHourly: null,
};

const windConfig = {
  id: 'wind',
  titleDaily: 'Intensidade do Vento (km/h)',
  titleHourly: null,
  type: 'line',
  /*colorStops: [
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
  ],*/
  yAxis: {
    max: 80,
    min: 0,
    tickAmount: 10,
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: "'Prompt', sans-serif",
        lineHeight: '16.8px',
        fontWeight: '400',
        color: 'var(--color-base-black)',
      },
      offsetY: 2,
      offsetX: 2,
    },
  },
  legendDaily: [
    {
      label: 'Fraca',
      description: '(0 < V <= 19)',
      //color: '#00A61C',
      color: null,
    },
    {
      label: 'Moderada',
      description: '(19 < V <= 49)',
      //color: '#FFCD05',
      color: null,
    },
    {
      label: 'Forte',
      description: '(V > 50)',
      //color: '#FF0000',
      color: null,
    },
  ],
  legendHourly: null,
};

export const configChart = {
  // eslint-disable-next-line prettier/prettier
  Precipitação: precipitationConfig,
  'Temperatura do Ar': temperatureConfig,
  'Umidade Relativa do Ar': humidityConfig,
  'Vento a 10 metros': windConfig,
};

export const AVAILABLE_CHARTS = [
  { id: 'precipitation', value: 'Precipitação', unit: 'mm' },
  { id: 'temperature', value: 'Temperatura do Ar', unit: '°C' },
  { id: 'humidity', value: 'Umidade Relativa do Ar', unit: '%' },
  { id: 'wind', value: 'Vento a 10 metros', unit: 'km/h' },
];
