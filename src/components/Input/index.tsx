import Image from 'next/image';
import React, { InputHTMLAttributes } from 'react';

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: {
    position: 'left' | 'right';
    src: string;
  };
}

const Input = ({ icon, ...props }: InputProps) => {
  return (
    <S.Wrapper>
      {icon && icon.position === 'left' && (
        <Image src={icon.src} width={15} height={15} />
      )}
      <S.StyledInput {...props} />
      {icon && icon.position === 'right' && (
        <Image src={icon.src} width={15} height={15} />
      )}
    </S.Wrapper>
  );
};

export default Input;
