import styled from 'styled-components';

export const WeatherChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;

  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    p {
      text-align: center;
    }
  }
`;

export const WeatherChartTitle = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
    font-family: 'Prompt', sans-serif;
    font-weight: 600;
    font-style: normal;
    color: var(--color-base-black);
    line-height: 2.4rem;
    margin-bottom: 2.75rem;
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
`;
