import { Card } from 'components/Card';
import Chart from 'components/Chart';
import { ChartDataProps } from 'components/Chart/ChartComponent';
import { isEmpty } from 'lodash';
import React from 'react';

type PrecipitationProps = {
  data: number[];
};
const PrecipitationAverage = ({ data }: PrecipitationProps) => {
  const chartData: ChartDataProps = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Precipitação Média:',
        data,
      },
    ],
    xaxis: {
      categories: ['01.Dia', '07.Dias', '15.Dias', '30.Dia'],
    },
  };

  return (
    <Card.Wrapper>
      <Card.Header>
        <span>Precipitação Média (mm) </span>
      </Card.Header>
      {!isEmpty(data) && (
        <Card.Body>
          <Chart id="chart-average" data={chartData} />
        </Card.Body>
      )}
      <Card.Footer>
        <span>Última atualização: há 2 minutos</span>
      </Card.Footer>
    </Card.Wrapper>
  );
};

export default PrecipitationAverage;
