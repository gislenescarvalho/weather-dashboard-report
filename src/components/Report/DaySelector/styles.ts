import styled from 'styled-components';

interface ChevronProps {
  direction: 'right' | 'bottom' | 'left' | 'up';
}

export const Chevron = styled.span<ChevronProps>`
  &::before {
    border-style: solid;
    border-width: 0.1rem 0.1rem 0 0;
    border-color: var(--color-primary-blue);
    content: '';
    display: inline-block;
    height: 0.75rem;
    left: 0.25rem;
    position: relative;
    top: 0.25rem;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.75rem;
  }

  ${({ direction }) =>
    direction === 'right' &&
    `
    &::before {
      left: 0;
      transform: rotate(45deg);
    }
  `}

  ${({ direction }) =>
    direction === 'bottom' &&
    `
    &::before {
      top: 0;
      transform: rotate(135deg);
    }
  `}

  ${({ direction }) =>
    direction === 'left' &&
    `
    &::before {
      left: 0.25em;
      transform: rotate(-135deg);
    }
  `}
`;

export const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Prompt', sans-serif;
  border: 0.063rem solid var(--color-gray-600);
  border-radius: 0.5rem;
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  color: var(--color-primary-blue);
  cursor: pointer;
  padding: 0.35rem 1rem;
  transition: color 0.3s;

  &:disabled {
    color: var(--color-gray-600);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: var(--color-primary-blue);
  }
`;

export const DateDisplay = styled.div`
  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: 0.5rem;
  text-align: center;
  color: var(--color-base-black);
  text-transform: capitalize;
`;
