import styled from 'styled-components';

export const ActiveTableWrapper = styled.div`
  width: 100%;
  border: 0.1rem solid var(--color-base-black);
  display: flex;
  flex-direction: column;
`;

export const ActiveDataRow = styled.div`
  width: 100%;
  height: 5.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  span:nth-child(1) {
    font-family: 'Prompt', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 1.2rem;
    color: var(--color-primary-blue);
  }
  span:nth-child(2) {
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.1rem;
    color: var(--color-secondary-green);
    position: relative;
    ::after {
      position: absolute;
      content: '';
      width: 0.1rem;
      height: 5.8rem;
      background-color: var(--color-base-black);
      bottom: -22px;
      right: -10px;
    }
    ::before {
      position: absolute;
      content: '';
      width: 0.1rem;
      height: 5.8rem;
      background-color: var(--color-base-black);
      bottom: -22px;
      left: -10px;
    }
  }
  span:nth-child(3) {
    width: 8.3rem;
    font-family: 'Prompt', sans-serif;
    font-weight: 400;
    font-style: italic;
    text-align: center;
    font-size: 1.2rem;
    color: var(--color-base-black);
  }
`;

export const Row = styled.div`
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid var(--color-base-black);
    padding: 0.3rem;
  }

  .classification,
  .affected,
  .events {
    background-color: var(--color-gray-100);
    font-family: 'Prompt', sans-serif;
    font-weight: bold;
    font-style: normal;
    font-size: 1.2rem;
    color: var(--color-base-black);
  }

  .weather {
    flex-direction: column;
    background-color: var(--color-blue-200);
    font-family: 'Prompt', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.2rem;
    color: var(--color-base-black);
  }

  .condition {
    background-color: var(--color-medium-champagne);
    font-family: 'Prompt', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.2rem;
    color: var(--color-base-black);
  }

  .basic {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
    font-style: italic;
    font-size: 1.1rem;
    color: var(--color-base-black);
  }
`;
