import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'Prompt', sans-serif;
  text-align: center;
`;

export const Title = styled.h2`
  font-family: 'Prompt', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Prompt', sans-serif;
  font-size: 3rem;
  font-weight: 600;
  line-height: 38.4px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #637883;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DescriptionText = styled.span`
  font-family: 'Prompt', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 31.2px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #637883;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const Button = styled.button<{ enabled: boolean; isGreen: boolean }>`
  padding: 1rem 2rem;
  background-color: ${({ enabled, isGreen }) =>
    enabled ? (isGreen ? '#00A61C' : '#0088CC') : '#D3D3D3'};
  color: #fafafa;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 15rem;

  &:hover {
    background-color: ${({ enabled, isGreen }) =>
      enabled ? (isGreen ? '#00A61C' : '#0088CC') : '#D3D3D3'};
  }

  &:active {
    background-color: ${({ enabled, isGreen }) =>
      enabled ? (isGreen ? '#00A61C' : '#0088CC') : '#D3D3D3'};
  }
`;
