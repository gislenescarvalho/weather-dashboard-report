import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const ContainerTitle = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Prompt', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 1.4rem;
  background-color: var(--color-neutral-white);
`;

export const ContainerBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const BodyContent = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow-y: hidden;
`;

export const ListWrapper = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 80vh;
  overflow-y: auto;

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
