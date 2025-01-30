import { getHours } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { chartsMock } from 'src/mocks/chartMocks';
import { AVAILABLE_CHARTS } from 'src/utils/chart-utils';

import ChartSelector from '../ChartSelector';
import DaySelector from '../DaySelector';
import ViewModeSelector from '../ViewModeSelector';
import WeatherChart from '../WeatherChart';
import WeatherTable from '../WeatherTable';
import {
  ChartContainer,
  SelectorContainer,
  WeatherChartContainer,
  WeatherChartDescription,
  WeatherChartTitle,
} from './styles';

type ChartKey = keyof typeof chartsMock;

interface HourlyForecastProps {
  data: any;
}

interface DataItem {
  dh_previsao: string;
  previsaoBoletimEspecialLista: {
    dhPrevisao: string | number | Date;
    vlChuvaPeriodo: number;
    vlTemperatura: number;
    vlUmidadeRelativa: number;
    vlVentoMaxRajada: number;
    vlVentoMedio: number;
  }[];
}

/**
 * Renders a component with a chart selector and a WeatherChart component.
 * When the user clicks on a button in the chart selector, the selected chart
 * type is updated in the state and the WeatherChart component is re-rendered
 * with the new chart type.
 *
 * @prop {DataItem[]} data - An array of DataItem objects, each containing
 * previsaoBoletimEspecialLista and dh_previsao properties.
 *
 * @returns {ReactElement} A React component with a chart selector and a
 * WeatherChart component.
 */
function HourlyForecast({ data }: HourlyForecastProps) {
  const [selectedChart, setSelectedChart] = useState<ChartKey>('Precipitação');
  const [viewMode, setViewMode] = useState<'table' | 'graphic'>('table');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [normalizeData, setNormalizeData] = useState<any[]>([]);

  function generateNextSevenDaysData(data: DataItem[], selectedIndex: number) {
    const previsaoBoletimEspecialLista =
      data[selectedIndex]?.previsaoBoletimEspecialLista;

    const hours = previsaoBoletimEspecialLista.map(item => {
      const brazilTimeZone = 'America/Sao_Paulo';
      const brazilDate = toZonedTime(item.dhPrevisao, brazilTimeZone);

      const hourInBrazil = getHours(brazilDate);
      return `${hourInBrazil}h`;
    });

    const chartValues = previsaoBoletimEspecialLista?.map(item => ({
      precipitation: item.vlChuvaPeriodo,
      temperature: item.vlTemperatura,
      humidity: item.vlUmidadeRelativa,
      windMax: item.vlVentoMaxRajada,
      windAvg: item.vlVentoMedio,
    }));

    return [
      {
        dates: data.map(item => item.dh_previsao),
        chartConfig: [
          {
            id: 'Precipitação',
            categories: hours,
            unit: 'mm',
            series: [
              {
                name: 'Precipitação (mm)',
                data: chartValues.map(item => Math.round(item.precipitation)),
              },
            ],
          },
          {
            id: 'Temperatura do Ar',
            categories: hours,
            unit: '°C',
            series: [
              {
                name: 'Temperatura do Ar (°C)',
                data: chartValues.map(item => Math.round(item.temperature)),
              },
            ],
          },
          {
            id: 'Umidade Relativa do Ar',
            categories: hours,
            unit: '%',
            series: [
              {
                name: 'Umidade Relativa do Ar (%)',
                data: chartValues.map(item => Math.round(item.humidity)),
              },
            ],
          },
          {
            id: 'Vento a 10 metros',
            categories: hours,
            unit: 'km/h',
            series: [
              {
                name: 'Intensidade do Vento (km/h): Vento Máximo(Rajada)',
                data: chartValues.map(item => Math.round(item.windMax)),
              },
              {
                name: 'Intensidade do Vento (km/h): Vento Médio',
                data: chartValues.map(item => Math.round(item.windAvg)),
              },
            ],
          },
        ],
      },
    ];
  }

  useEffect(() => {
    setNormalizeData(generateNextSevenDaysData(data, selectedIndex));
  }, [data, selectedIndex]);

  const handleButtonClick = (value: string) => {
    const chart = AVAILABLE_CHARTS.find(chart => chart.value === value);
    if (chart && chart.value in chartsMock) {
      setSelectedChart(chart.value as ChartKey);
    }
  };

  const renderChart = (selectedChart: string) => {
    const selectedChartOptions = normalizeData[0]?.chartConfig?.find(
      (item: { id: string }) => item.id === selectedChart,
    );
    return (
      <WeatherChart
        forecastType="hourly"
        selectedChart={selectedChart}
        chartOptions={selectedChartOptions}
      />
    );
  };

  return (
    <WeatherChartContainer>
      <WeatherChartTitle>
        <h1>Previsão a cada 3 horas</h1>
      </WeatherChartTitle>
      <WeatherChartDescription>
        <strong>ATENÇÃO: </strong> A previsibilidade das condições de tempo para
        períodos superiores a três dias é baixa. Assim, a previsão do tempo deve
        ser usada com cautela
      </WeatherChartDescription>
      <SelectorContainer>
        <DaySelector
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          options={data[selectedIndex]?.previsaoBoletimEspecialLista}
        />
        {viewMode === 'graphic' && (
          <ChartSelector
            selectedChart={selectedChart}
            handleButtonClick={handleButtonClick}
            options={AVAILABLE_CHARTS.map(chart => chart.value)}
          />
        )}
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
      </SelectorContainer>
      {viewMode === 'graphic' && (
        <ChartContainer>{renderChart(selectedChart)}</ChartContainer>
      )}
      {viewMode === 'table' && (
        <WeatherTable
          data={data[selectedIndex]?.previsaoBoletimEspecialLista}
        />
      )}
    </WeatherChartContainer>
  );
}

export default HourlyForecast;
