import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.75rem 2.75rem 0 2.75rem;
  font-family: 'Prompt', sans-serif;
`;

const Title = styled.h1`
  color: var(--color-gray-800);
  font-weight: 600;
  font-size: 2.15rem;
  line-height: 2.5rem;
`;

const BlueTitle = styled.h1`
  color: var(--color-primary-blue);
  font-size: 4.46rem;
  line-height: 5.35rem;
  font-weight: 700;
`;

const Subtitle = styled.div`
  color: var(--color-gray-800);
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2rem;
  padding: 2.25rem 0 1rem 0;
  font-family: 'Prompt', sans-serif;
  max-width: 67rem;

  p {
    padding: 0.5rem 0;
  }
`;

const CardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 2.75rem 1rem 2.75rem;
`;

const CardImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  background-color: var(--color-neutral-white);
  font-family: 'Prompt', sans-serif;
  gap: 1rem;

  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    font-family: 'Prompt', sans-serif;

    h5 {
      color: var(--color-gray-800);
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-weight: 700;
    }
    span {
      color: var(--color-gray-800);
      font-size: 1rem;
      line-height: 1.5rem;
      padding-top: 0.5rem;
      font-weight: 400;
    }
  }
  button {
    background-color: var(--color-green-800);
    color: var(--color-neutral-white);
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 700;
    font-size: 1.25rem;
    width: 20rem;
    padding: 1rem 2rem;
    cursor: pointer;
    font-family: 'Prompt', sans-serif;
  }

  button:hover {
    background-color: var(--color-secondary-green);
    transform: scale(1.05);
  }
`;

export {
  BlueTitle,
  CardBodyContainer,
  CardImageContainer,
  Subtitle,
  Title,
  TitleContainer,
};
