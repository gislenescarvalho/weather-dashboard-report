/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, toZonedTime } from 'date-fns-tz';
import React, { memo, useEffect, useState } from 'react';
import { IBoletimSummary } from 'src/models/boletim/boletim-summary';

import WeatherChart from '../WeatherChart';
import { ChartContainer, WeatherChartContainer } from './styles';

interface DailyForecastProps {
  data: IBoletimSummary[];
  chart: { id: string; value: string; unit: string };
}

interface DataItem {
  dh_previsao: string;
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
function DailyForecastSingle({ data, chart }: DailyForecastProps) {
  const [normalizeData, setNormalizeData] = useState<any[]>([]);

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
        unit: '',
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
        unit: '',
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
        unit: '',
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
        unit: '',
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
    <>
      <br />
      <br />
      <br />
      <WeatherChartContainer>
        <ChartContainer>{renderChart(chart.value)}</ChartContainer>
      </WeatherChartContainer>
    </>
  );
}

export default memo(DailyForecastSingle);
