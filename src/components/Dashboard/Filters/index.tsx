import { isEmpty } from 'lodash';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Card } from '../../Card';
import * as S from './styles';

type DataProps<T = any> = {
  id: number;
} & T;

interface IFiltroProps<T = any> {
  iconLeft: string;
  title: string;
  data?: DataProps<T>[];
  isLoading?: boolean;
  onSelectData?: (data: number[]) => void;
  textKey: keyof DataProps<T>;
  multipleValues?: boolean;
  selected?: number[];
}

export const Filters = <T,>({
  iconLeft,
  title,
  data,
  onSelectData,
  isLoading,
  textKey,
  multipleValues = false, // Valor padrão é true
  selected = [],
}: IFiltroProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleButtonClick = (item: DataProps) => {
    let updatedSelectedIds: number[] = [];

    if (multipleValues) {
      if (selectedIds.includes(item.id)) {
        // Se já estiver selecionado, remove do array
        updatedSelectedIds = selectedIds.filter(id => id !== item.id);
      } else {
        // Caso contrário, adiciona ao array
        updatedSelectedIds = [...selectedIds, item.id];
      }
      updatedSelectedIds = updatedSelectedIds.filter(id => id !== 0);
      if (item.id == 0) {
        updatedSelectedIds = [0];
      }
    }

    if (!multipleValues) {
      updatedSelectedIds = [item.id];
    }
    setSelectedIds(updatedSelectedIds);
    if (onSelectData) {
      onSelectData(updatedSelectedIds); // Retorna o array de IDs selecionados
    }
  };

  useEffect(() => {
    if (isEmpty(selectedIds)) {
      setSelectedIds([0]);
      onSelectData && onSelectData([0]);
    }

    if (!isEmpty(selected)) {
      setSelectedIds(selected);
    }
  }, [selected]);

  return (
    <Card.Wrapper>
      <Card.Header>
        <S.HeaderContent>
          <Image src={iconLeft} width={18} height={18} alt={title} />
          <span>{title}</span>
        </S.HeaderContent>
      </Card.Header>
      <Card.Body>
        <S.BodyContent>
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
            !isLoading &&
            data?.map(button => (
              <S.Button
                key={button.id}
                className="p-button-outlined"
                selected={selectedIds.includes(button.id)}
                onClick={() => handleButtonClick(button)}>
                {button[textKey] as React.ReactNode}
              </S.Button>
            ))
          )}
        </S.BodyContent>
      </Card.Body>
    </Card.Wrapper>
  );
};

export default Filters;
