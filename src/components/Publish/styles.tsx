import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-base-white);
  border-radius: 1rem;
  padding: 3.2rem;
  width: 100%;
  align-items: center;
  max-width: 90rem;
  font-family: 'Prompt', sans-serif;
  border: 1px solid var(--color-gray-600);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  line-height: 2.7rem;
  font-weight: 700;
  color: var(--color-gray-800);
  margin-bottom: 15px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1.5rem;
  line-height: 1.75rem;
  font-weight: 400;
  color: var(--color-base-black);
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  width: 100%;
  text-align: left;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid var(--color-gray-600);
  background: var(--color-neutral-white);
  border-radius: 0.5rem;
  resize: none;
  min-height: 15rem;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Button = styled.button<{ isGreen?: boolean }>`
  background-color: ${({ isGreen }) =>
    isGreen ? 'var(--color-secondary-green)' : 'var(--color-red-800)'};
  color: var(--color-neutral-white);
  border: none;
  padding: 1rem 2rem;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.75rem;
  border-radius: 1.2rem;
  width: 14rem;
  height: 4rem;
  text-align: center;
  cursor: pointer;
  margin-bottom: 3.2rem;

  &:disabled {
    background-color: ${({ isGreen }) =>
      isGreen ? 'var(--color-green-300)' : 'var(--color-red-300)'};
    color: var(--color-neutral-white);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ isGreen }) =>
      isGreen ? 'var(--color-green-300)' : 'var(--color-red-300)'};
    opacity: 0.5;
  }
`;

export { Box, Button, ButtonContainer, Label, TextArea, Title };
