import styled from 'styled-components';

export const WeatherChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    line-height: 3.5rem;
    margin-bottom: 1rem;
  }
`;

export const WeatherChartDescription = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-family: 'Prompt', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: var(--color-base-black);
  line-height: 1.5rem;
  margin-bottom: 2.75rem;

  strong {
    font-weight: 600;
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
`;

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  margin: 0 1.5rem;
`;
