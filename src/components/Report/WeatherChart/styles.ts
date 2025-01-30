import styled from 'styled-components';

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: var(--color-neutral-white);
`;

export const LegendTitle = styled.h5`
  font-family: 'Prompt', sans-serif;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: #637883;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.02rem;
`;

export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.75rem;
  gap: 2rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const LegendColorBox = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 0.4rem;
`;

export const LegendText = styled.div`
  font-family: 'Prompt', sans-serif;
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: #637883;
  span {
    font-weight: 400;
  }
`;

export const ChartLegendContainer = styled.div`
  padding-top: 1.6rem;
`;
