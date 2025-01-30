import Image from 'next/image';
import React from 'react';

import * as S from './styles';

interface ButtonProps {
  text: string;
  isGreen?: boolean;
  onClick: () => void;
}

interface PopupProps {
  title?: string;
  icon?: string; // Caminho do ícone opcional
  description: string[]; // Lista de textos descritivos
  buttons: ButtonProps[]; // Lista de botões
}

const PopupModal = ({ title, icon, description, buttons }: PopupProps) => {
  return (
    <S.Container>
      {/* Título com Ícone */}
      <S.Title>
        {icon && <Image src={icon} width={60} height={60} alt="Popup Icon" />}
        {title}
      </S.Title>

      {/* Descrição */}
      <S.Description>
        {description.map((text, index) => (
          <S.DescriptionText key={index}>{text}</S.DescriptionText>
        ))}
      </S.Description>

      {/* Botões Dinâmicos */}
      <S.ButtonContainer>
        {buttons.map((button, index) => (
          <S.Button
            key={index}
            enabled={true}
            isGreen={button.isGreen || false}
            onClick={button.onClick}>
            {button.text}
          </S.Button>
        ))}
      </S.ButtonContainer>
    </S.Container>
  );
};

export default PopupModal;
