import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 0.1rem solid var(--color-gray-500);
  border-radius: 0.4rem;
  padding: 0.6rem;

  &:focus-within {
    border-color: var(--color-primary-blue);
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Prompt', sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 1.2rem;

  ::placeholder {
    color: var(--color-gray-500);
  }
`;
