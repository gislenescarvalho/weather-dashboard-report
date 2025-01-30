import { Card } from 'components/Card';
import Chip from 'components/Chip';
import Input from 'components/Input';
import React, { useEffect, useState } from 'react';
import { IBoletimActive } from 'src/models/boletim/boletim-active';
import { getNow } from 'src/utils/date-utils';

import * as S from './styles';

type BoletimActivesAffectedsListProps = {
  actives: IBoletimActive[];
  handleSetActiveData: (active: any) => void;
};

const BoletimActivesAffectedsList = ({
  actives,
  handleSetActiveData,
}: BoletimActivesAffectedsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] =
    useState<string>('carregando...');

  const handleAffectedActiveClick = async (active: IBoletimActive) => {
    handleSetActiveData(active);
    if (selectedId === active.id) {
      setSelectedId(null);
      return;
    }
    setSelectedId(active.id); // Set the selected item ID
  };

  const filteredActivesAffecteds =
    (searchTerm.length > 0
      ? actives?.filter(data =>
          data.identificador
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        )
      : actives) ?? [];

  // Atualiza o tempo desde a última atualização em minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const now = getNow();
        const diffInMinutes = Math.floor(
          (now.getTime() - lastUpdated.getTime()) / 60000,
        );

        setTimeSinceLastUpdate(
          `há ${diffInMinutes} ${diffInMinutes > 1 ? 'minutos' : 'minuto'}`,
        );
        if (diffInMinutes < 1) {
          setTimeSinceLastUpdate('há menos de 1 minuto');
        }
      }
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <S.Container>
      <Card.Header>
        <span>Lista de ativos</span>
      </Card.Header>
      <S.BodyContent>
        <Input
          icon={{
            position: 'left',
            src: '/icons/SearchIcon.svg',
          }}
          placeholder="Filtrar ativo..."
          value={searchTerm}
          onChange={ev => setSearchTerm(ev.target.value)}
        />
        <S.ListWrapper>
          {filteredActivesAffecteds?.map(data => (
            <S.ListItem
              key={data.id}
              isSelected={data.id === selectedId}
              onClick={() => handleAffectedActiveClick(data)}>
              <div className="chips">
                <Chip
                  text={data.tipoAtivo.identificador}
                  variant="primary-green"
                />
              </div>
              <span className="text">{data.identificador}</span>
            </S.ListItem>
          ))}
        </S.ListWrapper>
      </S.BodyContent>
    </S.Container>
  );
};

export default BoletimActivesAffectedsList;
