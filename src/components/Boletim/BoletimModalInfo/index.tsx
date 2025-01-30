import Image from 'next/image';
import React from 'react';

import * as S from './styles';

interface IProps {
  onGoMap: () => void;
  onGoHome: () => void;
}

const BoletimModalInfo = ({ onGoMap, onGoHome }: IProps) => {
  return (
    <S.Container>
      <S.Title>
        <Image
          src="/icons/boletim/Alert.svg"
          width={60}
          height={60}
          alt="Temperatura"
        />
        Atenção
      </S.Title>
      <S.Description>
        <S.DescriptionText>
          Não foram localizados dados para as coordenadas selecionadas.
        </S.DescriptionText>
        <S.DescriptionText>
          Por favor, realize uma nova consulta.
        </S.DescriptionText>
      </S.Description>
      <S.ButtonContainer>
        <S.Button enabled={true} isGreen={false} onClick={onGoHome}>
          Voltar para home
        </S.Button>
        <S.Button enabled={true} isGreen={true} onClick={onGoMap}>
          Voltar para o mapa
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default BoletimModalInfo;
