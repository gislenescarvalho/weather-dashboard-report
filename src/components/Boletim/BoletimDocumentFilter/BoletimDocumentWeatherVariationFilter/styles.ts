import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  gap: 3.2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 4.4rem 0;
`;

const Card = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  width: 30rem;
  justify-content: center;
  padding: 1.5rem 2rem;
  border: 0.1rem solid
    ${props =>
      props.selected ? 'var(--color-primary-blue)' : 'var(--color-gray-600)'};
  border-radius: 0.8rem;
  cursor: pointer;
  background-color: ${props =>
    props.selected ? 'var(--color-primary-blue)' : 'var(--color-base-white)'};
  transition: all 0.3s ease;
`;

const Icon = styled.span`
  margin-right: 0.8rem;
`;

const Label = styled.span<{ selected: boolean }>`
  font-size: 1.8rem;
  line-height: 2.1rem;
  font-family: 'Prompt', sans-serif;
  font-weight: ${props => (props.selected ? '600' : '400')};
  color: ${props =>
    props.selected ? 'var(--color-base-white)' : 'var(--color-base-black)'};
`;

const Title = styled.h2`
  font-family: 'Prompt', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Prompt', sans-serif;
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 3.1rem;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--color-base-black);
  padding-top: 4rem;
`;

export { Card, CardContainer, Icon, Label, Title };
