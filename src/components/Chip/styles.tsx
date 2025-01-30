import styled, { css } from 'styled-components';

type WrapperProps = {
  variant: {
    background: string;
    color: string;
  };
};

export const Wrapper = styled.div<WrapperProps>`
  padding: 0.2rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-neutral-white);
  border-radius: 2rem;

  span {
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.2rem;
    color: white;
  }

  ${props =>
    props.variant &&
    css`
      background-color: ${props.variant.background};

      span {
        font-family: 'Prompt', sans-serif;
        font-weight: 500;
        font-style: normal;
        font-size: 1.2rem;
        color: ${props.variant.color};
      }
    `}
`;
