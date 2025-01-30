import styled from 'styled-components';

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Prompt', sans-serif;
  margin-bottom: 1.5rem;
`;

export const Label = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: var(--color-base-black);
`;

export const ToggleButtonGroup = styled.div`
  display: flex;
  border: 0.063rem solid var(--color-gray-600);
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.625rem 1.25rem;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5rem;
  font-family: 'Prompt', sans-serif;
  background-color: ${({ active }) =>
    active ? 'var(--color-primary-blue)' : '#FAFAFA'};
  color: ${({ active }) =>
    active ? 'var(--color-neutral-white)' : 'var(--color-base-black)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ active }) =>
      active ? 'var(--color-primary-blue)' : 'var(--color-blue-100)'};
  }

  &:first-child {
    border-right: 1px solid var(--color-gray-600);
  }
`;
