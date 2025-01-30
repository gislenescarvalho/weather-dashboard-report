/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { chartsMock } from 'src/mocks/chartMocks';
import { IBoletimSummary } from 'src/models/boletim/boletim-summary';
import { AVAILABLE_CHARTS } from 'src/utils/chart-utils';

import ChartSelector from '../ChartSelector';
import WeatherChart from '../WeatherChart';
import {
  ChartContainer,
  WeatherChartContainer,
  WeatherChartTitle,
} from './styles';

type ChartKey = keyof typeof chartsMock;

interface DailyForecastProps {
  data: IBoletimSummary[];
}

interface DataItem {
  dh_previsao: Date | string;
  vl_chuva_periodo?: number | null;
  temperatura_max?: number | null;
  temperatura_min?: number | null;
  umidade_max?: number | null;
  umidade_min?: number | null;
  vento_rajada_max?: number | null;
  vento_velocidade_avg?: number | null;
  previsaoBoletimEspecialLista?: any[];
}

/**
 * DailyForecast component renders weather forecast charts for daily data.
 *
 * Props:
 * - `data`: An array of forecast data objects containing weather attributes like
 *   precipitation, temperature, humidity, and wind information.
 *
 * State:
 * - `selectedChart`: The currently selected chart type to display.
 * - `normalizeData`: The transformed weather data suitable for chart rendering.
 *
 * Functions:
 * - `handleButtonClick`: Updates the selected chart based on user interaction.
 * - `generateWeatherData`: Transforms raw data into a format suitable for charting,
 *   extracting date, precipitation, temperature, humidity, and wind information.
 * - `renderChart`: Renders the weather chart based on the selected chart and data.
 *
 * Usage:
 * This component is used to display weather data in various chart formats,
 * allowing users to select different weather attributes to visualize.
 */
function DailyForecast({ data }: DailyForecastProps) {
  const [selectedChart, setSelectedChart] = useState('Precipitação');
  const [normalizeData, setNormalizeData] = useState<any[]>([]);

  const handleButtonClick = (value: string) => {
    const chart = AVAILABLE_CHARTS.find(chart => chart.value === value);
    if (chart && chart.value in chartsMock) {
      setSelectedChart(chart.value as ChartKey);
    }
  };

  function generateWeatherData(data: DataItem[]) {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    const days = data?.map(item => {
      const timeZone = 'America/Sao_Paulo';
      const dateInTimeZone = toZonedTime(item.dh_previsao, timeZone);

      const dayOfWeek = daysOfWeek[dateInTimeZone.getDay()];
      const dayMonth = format(dateInTimeZone, 'dd/MM');

      return [dayMonth, dayOfWeek];
    });

    return [
      {
        id: 'Precipitação',
        categories: days,
        unit: 'mm',
        series: [
          {
            name: 'Previsão de precipitação acumulada por dia (mm)',
            data: data.map(item =>
              item.vl_chuva_periodo ? Math.round(item.vl_chuva_periodo) : null,
            ),
          },
        ],
      },
      {
        id: 'Temperatura do Ar',
        categories: days,
        unit: '°C',
        series: [
          {
            name: 'Máxima - Temperatura do Ar (°C)',
            data: data.map(item =>
              item.temperatura_max ? Math.round(item.temperatura_max) : null,
            ),
          },
          {
            name: 'Mínima - Temperatura do Ar (°C)',
            data: data.map(item =>
              item.temperatura_min ? Math.round(item.temperatura_min) : null,
            ),
          },
        ],
      },
      {
        id: 'Umidade Relativa do Ar',
        categories: days,
        unit: '%',
        series: [
          {
            name: 'Máxima Umidade Relativa do Ar (%)',
            data: data.map(item =>
              item.umidade_max ? Math.round(item.umidade_max) : null,
            ),
          },
          {
            name: 'Mínima Umidade Relativa do Ar (%)',
            data: data.map(item =>
              item.umidade_min ? Math.round(item.umidade_min) : null,
            ),
          },
        ],
      },
      {
        id: 'Vento a 10 metros',
        categories: days,
        unit: 'km/h',
        series: [
          {
            name: 'Intensidade do Vento (km/h): Vento Médio',
            data: data.map(item =>
              item.vento_velocidade_avg
                ? Math.round(item.vento_velocidade_avg)
                : null,
            ),
          },
          {
            name: 'Intensidade do Vento (km/h): Vento Máximo (Rajada)',
            data: data.map(item =>
              item.vento_rajada_max ? Math.round(item.vento_rajada_max) : null,
            ),
          },
        ],
      },
    ];
  }

  useEffect(() => {
    setNormalizeData(generateWeatherData(data));
  }, [data]);

  const renderChart = (selectedChart: string) => {
    const selectedChartOptions = normalizeData?.find(
      item => item.id === selectedChart,
    );

    return (
      <WeatherChart
        forecastType="daily"
        selectedChart={selectedChart}
        chartOptions={selectedChartOptions}
      />
    );
  };

  return (
    <WeatherChartContainer>
      <WeatherChartTitle>
        <h1>Previsão dia a dia</h1>
      </WeatherChartTitle>
      <ChartSelector
        selectedChart={selectedChart}
        handleButtonClick={handleButtonClick}
        options={AVAILABLE_CHARTS.map(chart => chart.value)}
      />
      <ChartContainer>{renderChart(selectedChart)}</ChartContainer>
    </WeatherChartContainer>
  );
}

export default DailyForecast;
