import styled from 'styled-components';

export const BodyContent = styled.div`
  width: 100%;
`;

export const ListWrapper = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  max-height: 50rem;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ListItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.4rem 1.2rem;
  align-items: flex-start;
  justify-content: flex-start;
  border-top: 0.1rem solid transparent;
  border-bottom: 0.1rem solid var(--color-gray-500);
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--color-blue-100)' : 'transparent'};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    bottom: 0;
    width: 0.4rem;
    height: 90%;
    background-color: ${({ isSelected }) =>
      isSelected ? 'var(--color-primary-blue)' : 'transparent'};
  }

  .chips {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.4rem;
  }

  .text {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 1.2rem;
    color: var(--color-base-black);
  }
`;
