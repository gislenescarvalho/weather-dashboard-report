import { Card } from 'components/Card';
import Image from 'next/image';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import * as S from './styles';

interface IProps {
  lastUpdatedDate: Date;
  isLoading: boolean;
}

export const UpdatedTime = ({ lastUpdatedDate, isLoading }: IProps) => {
  const date = new Date(lastUpdatedDate);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Card.Wrapper>
      <S.Content>
        {isLoading ? (
          <div className="flex-center">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#0088cc"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        ) : (
          <>
            <Image
              src={'/icons/ReloadIcon.svg'}
              width={18}
              height={18}
              alt="Reload icon"
            />
            <span>Data de Atualização:</span>
            <span id="date">{formattedDate}</span>
          </>
        )}
      </S.Content>
    </Card.Wrapper>
  );
};
