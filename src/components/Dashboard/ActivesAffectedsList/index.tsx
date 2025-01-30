import { Card } from 'components/Card';
import Chip, { ChipVariants } from 'components/Chip';
import Input from 'components/Input';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ConditionModel } from 'src/models/condition';
import {
  getActivesPrevisionAffecteds,
  getCoordsActivesPrevisionAffecteds,
} from 'src/service/dashboard';
import { getNow } from 'src/utils/date-utils';
import useSWR from 'swr';

import * as S from './styles';

type ActivesAffectedsListProps = {
  activeTypeId?: number[];
  enterpriseId?: number[];
  previsionDate?: string;
  tensionClassId?: number[];
  condicaoidlista?: number[];
  handleSetAffectedGeometry: (geom: any[]) => void;
  handleSetPrecipitationData: (precipitation: any) => void;
  handleSetActiveData: (active: any) => void;
  handleDataSearched?: (active: any) => void;
};

const ActivesAffectedsList = ({
  activeTypeId,
  enterpriseId,
  previsionDate,
  tensionClassId,
  condicaoidlista,
  handleSetAffectedGeometry,
  handleSetPrecipitationData,
  handleSetActiveData,
  handleDataSearched,
}: ActivesAffectedsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] =
    useState<string>('carregando...');

  const {
    data: listActivesAffeteds,
    isLoading: isLoadingListActivesAffecteds,
  } = useSWR(
    [
      'list-actives-affected',
      activeTypeId,
      enterpriseId,
      previsionDate,
      tensionClassId,
      condicaoidlista,
    ],
    async () => {
      if (
        !previsionDate &&
        !enterpriseId &&
        !activeTypeId &&
        !tensionClassId &&
        !condicaoidlista
      ) {
        return;
      }
      setLastUpdated(getNow());
      const actives = await getActivesPrevisionAffecteds({
        params: {
          data: previsionDate,
          empresaidlista: enterpriseId,
          tipoativoidlistalista: activeTypeId,
          classetensaoidlista: tensionClassId,
          condicaoidlista: condicaoidlista,
        },
      });
      handleDataSearched && handleDataSearched(actives.data);
      return actives.data;
    },
    {
      revalidateOnMount: true,
    },
  );

  const filteredActivesAffecteds =
    (searchTerm.length > 0
      ? listActivesAffeteds?.filter(data =>
          data.ativo.identificador
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        )
      : listActivesAffeteds) ?? [];

  const handleAffectedActiveClick = async (active: ConditionModel) => {
    handleSetActiveData(active);
    setSelectedId(active.id); // Set the selected item ID
    const { data } = await getCoordsActivesPrevisionAffecteds({
      params: { previsaoeventoid: active.id },
    });
    handleSetAffectedGeometry(data);
    handleSetPrecipitationData({
      maxPrecipitation: [
        active.max_val_precipitacao_acum_01_di,
        active.max_val_precipitacao_acum_07_di,
        active.max_val_precipitacao_acum_15_di,
        active.max_val_precipitacao_acum_30_di,
      ].map(Math.round),
      averagePrecipitation: [
        active.mean_val_precipitacao_acum_01_d,
        active.mean_val_precipitacao_acum_07_d,
        active.mean_val_precipitacao_acum_15_d,
        active.mean_val_precipitacao_acum_30_d,
      ].map(Math.round),
    });
  };

  const handleGetConditionColor = (condition: string): ChipVariants => {
    if (condition.toLowerCase().includes('severa')) {
      return 'primary-red';
    }

    return 'primary-yellow';
  };

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
    <Card.Wrapper>
      <Card.Header>
        <span>Lista de ativos afetados pela condição selecionada</span>
      </Card.Header>
      <Card.Body>
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
            {isLoadingListActivesAffecteds && (
              <div className="loading">
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#0088cc"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            )}

            {filteredActivesAffecteds
              ?.sort((a, b) =>
                a.ativo.identificador.localeCompare(b.ativo.identificador),
              )
              .map((data: ConditionModel) => (
                <S.ListItem
                  key={data.id}
                  isSelected={data.id === selectedId}
                  onClick={() => handleAffectedActiveClick(data)}>
                  <div className="chips">
                    <Chip
                      text={data.ativo.tipoAtivo.identificador}
                      variant="primary-green"
                    />
                    <Chip text={data.empresa.nome} variant="primary-blue" />
                    <Chip
                      text={`${data.classeTensao.identificador} kv`}
                      variant="secondary-green"
                    />
                    <Chip
                      text={data.condicaoMeteorologica.nome}
                      variant={handleGetConditionColor(
                        data.condicaoMeteorologica.nome,
                      )}
                    />
                  </div>
                  <span className="text">{data.ativo.identificador}</span>
                </S.ListItem>
              ))}
          </S.ListWrapper>
        </S.BodyContent>
      </Card.Body>
      <Card.Footer>
        <span>Última atualização: {timeSinceLastUpdate}</span>
      </Card.Footer>
    </Card.Wrapper>
  );
};

export default ActivesAffectedsList;
