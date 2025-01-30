import React, { ReactNode } from 'react';

import * as S from './styles';

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <S.CardWrapper>{children}</S.CardWrapper>;
};

export default Card;
