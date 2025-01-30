import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
`;

export const ChartButton = styled.button<{ selected: boolean }>`
  font-family: 'Prompt', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 1.4rem;
  line-height: 1.25rem;
  background-color: ${({ selected }) =>
    selected ? 'var(--color-primary-blue)' : 'var(--color-neutral-white)'};
  color: ${({ selected }) =>
    selected ? 'var(--color-neutral-white)' : 'var(--color-gray-800)'};
  border: 0.025rem solid
    ${({ selected }) =>
      selected ? 'var(--color-primary-blue)' : 'var(--color-gray-800)'};
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ selected }) =>
      selected ? 'var(--color-primary-blue)' : 'var(--color-gray-100)'};
  }
`;
