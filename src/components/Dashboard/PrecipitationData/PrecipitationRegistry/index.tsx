import { Card } from 'components/Card';
import Chart from 'components/Chart';
import { ChartDataProps } from 'components/Chart/ChartComponent';
import { isEmpty } from 'lodash';
import React from 'react';

import * as S from './styles';

type PrecipitationRegistryProps = {
  precipitation?: any;
};

const PrecipitationRegistry = ({
  precipitation,
}: PrecipitationRegistryProps) => {
  const averageChartData: ChartDataProps = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Precipitação Média:',
        data: precipitation?.averagePrecipitation ?? [],
      },
    ],
    xaxis: {
      categories: ['01.Dia', '07.Dias', '15.Dias', '30.Dia'],
    },
  };

  const maximiumChartData: ChartDataProps = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Precipitação Máxima',
        data: precipitation?.maxPrecipitation ?? [],
      },
    ],
    xaxis: {
      categories: ['01.Dia', '07.Dias', '15.Dias', '30.Dia'],
    },
  };

  if (isEmpty(precipitation))
    return (
      <Card.Wrapper>
        <Card.Header>
          <span>Registro de precipitação (mm) </span>
        </Card.Header>
      </Card.Wrapper>
    );

  return (
    <Card.Wrapper>
      <Card.Header>
        <span>Registro de precipitação (mm) </span>
      </Card.Header>
      <Card.Body>
        <br />
        <S.graphicWrapper>
          <span>Precipitação Máxima (mm)</span>
          <Chart id="chart-maximium" data={maximiumChartData} />
        </S.graphicWrapper>
        <S.graphicWrapper>
          <span>Precipitação Média (mm)</span>
          <Chart id="chart-average" data={averageChartData} />
        </S.graphicWrapper>
      </Card.Body>
    </Card.Wrapper>
  );
};

export default PrecipitationRegistry;
