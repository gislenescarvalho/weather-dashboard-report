import styled from 'styled-components';

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.6rem;

  span {
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.4rem;
  }
`;

export const BodyContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.4rem;

  .flex-center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Button = styled.button<{ selected?: boolean }>`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid var(--color-primary-blue);
  background-color: ${props =>
    props.selected ? 'var(--color-primary-blue)' : 'white'};
  color: ${props => (props.selected ? 'white' : 'var(--color-primary-blue)')};
  cursor: pointer;
  border-radius: 0.5rem;

  transition: all 0.3s ease;

  font-family: 'Prompt', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.2rem;

  &:hover {
    background-color: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    color: white;
  }
`;
