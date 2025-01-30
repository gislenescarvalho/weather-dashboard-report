import React, { ReactNode } from 'react';

import * as S from './styles';

type CardFooterProps = {
  children: ReactNode;
};

const CardFooter = ({ children }: CardFooterProps) => {
  return <S.CardFooter>{children}</S.CardFooter>;
};

export default CardFooter;
