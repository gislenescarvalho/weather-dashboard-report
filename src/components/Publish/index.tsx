import React from 'react';

import * as S from './styles';

type PublishProps = {
  handleButtonClick: () => void;
  handleButtonClickImportAgain: () => void;
  importStatus: string;
  isDisabled?: boolean;
};

// React Component
const Publish = ({
  handleButtonClick,
  handleButtonClickImportAgain,
  importStatus,
  isDisabled,
}: PublishProps) => {
  return (
    <S.Box>
      <S.Title>Publicação dos dados de eventos extremos</S.Title>

      <S.ButtonContainer>
        <S.Button isGreen onClick={handleButtonClick} disabled={isDisabled}>
          Publicar
        </S.Button>
        <S.Button
          isGreen={false}
          onClick={handleButtonClickImportAgain}
          disabled={false}>
          Re-Publicar
        </S.Button>
      </S.ButtonContainer>
      <S.Label htmlFor="importStatus">
        Andamento da Importação dos dados
      </S.Label>
      <S.TextArea id="importStatus" value={importStatus} readOnly />
    </S.Box>
  );
};

export default Publish;
