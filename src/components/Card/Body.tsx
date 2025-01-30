import React, { ReactNode } from 'react';

import * as S from './styles';

type CardBodyProps = {
  children: ReactNode;
};

const CardBody = ({ children }: CardBodyProps) => {
  return <S.CardBody>{children}</S.CardBody>;
};

export default CardBody;
