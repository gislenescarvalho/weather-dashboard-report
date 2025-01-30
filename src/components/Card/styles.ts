import styled from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.2rem;
  border: 0.025rem solid var(--color-gray-600);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-white);
`;

export const CardHeader = styled.div`
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

export const CardBody = styled.div`
  margin-top: 1.6rem;
  width: 100%;
  background-color: var(--color-neutral-white);
  margin-bottom: 0.9rem;
`;

export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Prompt', sans-serif;
  font-weight: 300;
  font-style: italic;
  font-size: 0.625rem;
  line-height: 0.8rem;
  background-color: var(--color-neutral-white);
`;
