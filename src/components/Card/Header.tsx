import React, { ReactNode } from 'react';

import * as S from './styles';

type CardHeaderProps = {
  children: ReactNode;
};

const CardHeader = ({ children }: CardHeaderProps) => {
  return <S.CardHeader>{children}</S.CardHeader>;
};

export default CardHeader;
