import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { getTotalsByActiveType } from 'src/service/dashboard';
import { getNow } from 'src/utils/date-utils';
import useSWR from 'swr';

import { Card } from '../../Card';
import * as S from './styles';

type ActivesAffectedsProps = {
  activeTypeId?: number[];
  enterpriseId?: number[];
  previsionDate?: string;
  tensionClassId?: number[];
  condicaoidlista?: number[];
};

const AffectedAssets = ({
  activeTypeId,
  enterpriseId,
  previsionDate,
  tensionClassId,
  condicaoidlista,
}: ActivesAffectedsProps) => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] =
    useState<string>('carregando...');
  const [lastPrevisionDate, setLastPrevisionDate] = useState<string | null>();

  const {
    data: { data: activesAffected } = {},
    isLoading: isLoadingActivesAffecteds,
  } = useSWR(
    [
      'actives-affected',
      activeTypeId,
      enterpriseId,
      previsionDate,
      tensionClassId,
      condicaoidlista,
    ],
    () => {
      if (
        !previsionDate &&
        !enterpriseId &&
        !activeTypeId &&
        !tensionClassId &&
        !condicaoidlista
      ) {
        return;
      }

      setLastPrevisionDate(previsionDate);
      setLastUpdated(getNow());
      return getTotalsByActiveType({
        params: {
          data: previsionDate,
          empresaidlista: enterpriseId,
          tipoativoidlistalista: activeTypeId,
          classetensaoidlista: tensionClassId,
          condicaoidlista: condicaoidlista,
        },
      });
    },
    {
      revalidateOnMount: true,
    },
  );

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

  const getTotalByTipoativo = (tipoativo: string) => {
    return (
      activesAffected?.find(item => item.tipoativo === tipoativo)?.total ?? 0
    );
  };

  return (
    <S.Wrapper>
      <Card.Wrapper>
        <Card.Header>
          <S.HeaderContent>
            <span>LTs afetadas pelo evento meteorológico</span>
          </S.HeaderContent>
        </Card.Header>
        <Card.Body>
          <S.BodyContent>
            <span>
              {isLoadingActivesAffecteds ? (
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
              ) : (
                `${getTotalByTipoativo('LT')} LT's`
              )}
            </span>
          </S.BodyContent>
        </Card.Body>
        <Card.Footer>
          <span>Última atualização: {timeSinceLastUpdate}</span>
        </Card.Footer>
      </Card.Wrapper>
      <Card.Wrapper>
        <Card.Header>
          <S.HeaderContent>
            <span>SEs afetadas pelo evento meteorológico</span>
          </S.HeaderContent>
        </Card.Header>
        <Card.Body>
          <S.BodyContent>
            <span>
              {isLoadingActivesAffecteds ? (
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
              ) : (
                `${getTotalByTipoativo('SE')} SE's`
              )}
            </span>
          </S.BodyContent>
        </Card.Body>
        <Card.Footer>
          <span>Última atualização: {timeSinceLastUpdate}</span>
        </Card.Footer>
      </Card.Wrapper>
    </S.Wrapper>
  );
};

export default AffectedAssets;
