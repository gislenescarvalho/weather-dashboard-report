import Chart from 'components/Chart';
import { ChartDataProps } from 'components/Chart/ChartComponent';
import { isEmpty } from 'lodash';
import React from 'react';
import { configChart } from 'src/utils/chart-utils';

import * as S from './styles';

type WeatherChartProps = {
  selectedChart?: any;
  forecastType?: string;
  chartOptions?: any;
};

/**
 * WeatherChart component.
 *
 * @param {object} props Component props.
 * @param {string} props.selectedChart Selected chart option.
 * @param {string} props.forecastType Weather forecast type (daily or hourly).
 * @param {object} props.chartOptions Chart data options.
 * @returns {React.ReactElement} WeatherChart component.
 */
const WeatherChart = ({
  selectedChart,
  forecastType,
  chartOptions,
}: WeatherChartProps) => {
  const {
    id,
    type: chartType,
    //colorStops: gradientColors,
    yAxis: yAxisConfig,
    titleDaily,
    titleHourly,
    legendDaily,
    legendHourly,
  } = (configChart as any)[selectedChart];

  const chartLegend =
    forecastType === 'daily' ? legendDaily : legendHourly ?? legendDaily;
  const selectedChartText =
    forecastType === 'hourly' ? titleHourly : titleDaily;

  if (isEmpty(chartOptions))
    return <S.EmptyContainer>{selectedChartText}</S.EmptyContainer>;

  const weatherChartData = {
    chart: {
      type: chartType ?? 'line',
      nullDataHandling: 'drop', // Can be 'ignore' or 'drop'
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
    colors: ['#0088cc', '#00a61c'],
    /* Temporally disabled gradient fill */
    /*fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: gradientColors,
      },
    },*/
    xaxis: {
      categories: chartOptions?.categories ?? [],
      labels: {
        rotate: 0,
        style: {
          fontSize: '14px',
          fontFamily: "'Prompt', sans-serif",
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
    yaxis: yAxisConfig,
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'normal',
        fontFamily: "'Prompt', sans-serif",
        colors: ['transparent'],
      },
      formatter: (val: any) => {
        return val !== null ? `${val} ${chartOptions?.unit ?? ''}` : '';
      },
      background: {
        enabled: true,
        foreColor: '#333',
        padding: 4,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'transparent',
      },
      offsetY: -5,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: any) =>
          `${value ?? '-'} ${chartOptions?.unit ?? ''}`,
      },
    },
    series: chartOptions?.series ?? [],
  } as ChartDataProps;

  const chartId = `${id}-${forecastType}`;

  return (
    <>
      <Chart id={chartId ?? 'weather-chart'} data={weatherChartData} />
      <S.ChartLegendContainer>
        <S.LegendTitle>Classificação {selectedChartText}:</S.LegendTitle>
        <S.LegendContainer>
          {chartLegend.map((item: any, index: any) => (
            <S.LegendItem key={`${item.label}-${index}`}>
              {item.color && <S.LegendColorBox color={item.color} />}
              <S.LegendText>
                <span>
                  {item.label} {item.description}
                </span>
              </S.LegendText>
            </S.LegendItem>
          ))}
        </S.LegendContainer>
      </S.ChartLegendContainer>
    </>
  );
};

export default WeatherChart;
