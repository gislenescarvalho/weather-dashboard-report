import {
  humidityDailyOptions,
  humidityDailySeries,
  humidityLegend,
} from './humidityChartMockDaily';
import {
  humidityHourlyOptions,
  humidityHourlySeries,
} from './humidityChartMockHourly';
import {
  precipitationDailyOptions,
  precipitationDailySeries,
  precipitationLegend,
} from './precipitationChartMockDaily';
import {
  precipitationHourlyOptions,
  precipitationHourlySeries,
} from './precipitationChartMockHourly';
import {
  temperatureDailyOptions,
  temperatureDailySeries,
  temperatureLegend,
} from './temperatureChartMockDaily';
import {
  temperatureHourlyOptions,
  temperatureHourlySeries,
} from './temperatureChartMockHourly';
import {
  windDailyOptions,
  windDailySeries,
  windLegend,
} from './windChartMockDaily';
import { windHourlyOptions, windHourlySeries } from './windChartMockHourly';

const precipitationConfig = {
  id: 'precipitation',
  title: 'Precipitação (mm)',
  optionsDaily: precipitationDailyOptions || {},
  optionsHourly: precipitationHourlyOptions || {},
  seriesDaily: precipitationDailySeries || {},
  seriesHourly: precipitationHourlySeries || {},
  legend: precipitationLegend || {},
};

const temperatureConfig = {
  id: 'temperature',
  title: 'Temperatura do Ar (°C)',
  optionsDaily: temperatureDailyOptions || {},
  optionsHourly: temperatureHourlyOptions || {},
  seriesDaily: temperatureDailySeries || {},
  seriesHourly: temperatureHourlySeries || {},
  legend: temperatureLegend || {},
};

const humidityConfig = {
  id: 'humidity',
  title: 'Umidade Relativa do Ar (%)',
  optionsDaily: humidityDailyOptions || {},
  optionsHourly: humidityHourlyOptions || {},
  seriesDaily: humidityDailySeries || {},
  seriesHourly: humidityHourlySeries || {},
  legend: humidityLegend || {},
};

const windConfig = {
  id: 'wind',
  title: 'Intensidade do Vento (km/h)',
  optionsDaily: windDailyOptions || {},
  optionsHourly: windHourlyOptions || {},
  seriesDaily: windDailySeries || {},
  seriesHourly: windHourlySeries || {},
  legend: windLegend || {},
};

export const chartsMock = {
  Precipitação: precipitationConfig,
  'Temperatura do Ar': temperatureConfig,
  'Umidade Relativa do Ar': humidityConfig,
  'Vento a 10 metros': windConfig,
};

export const AVAILABLE_CHARTS = [
  { id: 'precipitation', value: 'Precipitação' },
  { id: 'temperature', value: 'Temperatura do Ar' },
  { id: 'humidity', value: 'Umidade Relativa do Ar' },
  { id: 'wind', value: 'Vento a 10 metros' },
];
