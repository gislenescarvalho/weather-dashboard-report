import styled from 'styled-components';

export const ContainerGlobal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  margin-top: 7rem;
`;

export const Container = styled.div`
  width: 100%;
  max-height: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export const ContainerTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ContainerActives = styled.div`
  width: 50rem;
`;

export const ContainerMap = styled.div`
  width: 100%;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// Botão estilizado de "Fechar"
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  transition: color 0.2s;
  z-index: 999;

  &:hover {
    color: #ff0000;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15vh; /* Posiciona o contêiner de botões acima da borda inferior */
  left: 50%;
  transform: translateX(-10%); /* Centraliza o contêiner horizontalmente */
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
  z-index: 999;
  justify-content: center;
  align-items: center;
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

  &:hover {
    background-color: ${({ enabled, isGreen }) =>
      enabled ? (isGreen ? '#218838' : '#0056b3') : '#D3D3D3'};
  }

  &:active {
    background-color: ${({ enabled, isGreen }) =>
      enabled ? (isGreen ? '#1e7e34' : '#004085') : '#D3D3D3'};
  }
`;
