import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Prompt', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
  text-align: center;
  color: #333;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #888;
  text-align: center;
  margin-bottom: 1.6rem;
`;

export const DaysWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const DayCard = styled.div<{ active: boolean; showArrow: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ active }) => (active ? '#0088CC' : '#FAFAFA')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: ${({ active }) =>
    active ? '0.2rem solid #0088CC' : '0.1rem solid #ddd'};
  border-radius: 0.8rem 0.8rem 0 0;
  padding: 1rem 1.6rem;
  min-width: 10rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0088cc;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  }

  span {
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
    color: ${({ active }) => (active ? '#FAFAFA' : '#637883')};
  }

  small {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    color: ${({ active }) => (active ? '#FAFAFA' : '#637883')};
  }

  /* Exibe a seta apenas se showArrow e active forem verdadeiros */
  ${({ active, showArrow }) =>
    active &&
    showArrow &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -3rem; /* Distância abaixo da borda */
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 1.2rem solid transparent;
      border-right: 1.2rem solid transparent;
      border-top: 2rem solid #0088CC; /* Cor da seta */
    }
  `}
`;
