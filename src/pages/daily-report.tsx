import DailyReportDocumentCreate from 'components/DailyReport/DailyReportDocumentCreate';
import React, { useMemo } from 'react';
import {
  getActivesPrevisionAffecteds,
  getAvailableDates,
} from 'src/service/dashboard';
import * as S from 'styles/pages/daily-report.styles';
import useSWR from 'swr';

const DailyReport = () => {
  const { data: availablesDate, isLoading: isLoadingAvailablesDate } = useSWR(
    ['available-dates-dashboard'],
    getAvailableDates,
  );

  const previsionsDate = useMemo(() => {
    return availablesDate?.map(date => ({
      ...date,
      raw: date.raw.split('T')[0],
      timezone: date.raw,
      condicaoidlista: 2, // Somente condição severa
    }));
  }, [availablesDate]);

  const { data: listActivesAffected, error } = useSWR(
    previsionsDate && previsionsDate.length > 0
      ? ['list-actives-affected', previsionsDate]
      : null,

    async ([, dates]) => {
      const requests = dates.map(date =>
        getActivesPrevisionAffecteds({
          params: {
            data: date.raw,
            condicaoidlista: date.condicaoidlista, // 1: Condição Moderada, 2: Condição Severa
          },
        }),
      );

      const responses = await Promise.all(requests);
      return responses.map((res, index) => ({
        date: dates[index].date,
        substation: res.data.filter(
          item => item.ativo.tipoAtivo.identificador === 'SE',
        ),
        transmissionLine: res.data.filter(
          item => item.ativo.tipoAtivo.identificador === 'LT',
        ),
      }));
    },
    {
      revalidateOnMount: true,
    },
  );

  return (
    <>
      {!error && !isLoadingAvailablesDate && (
        <S.DailyReportContainer>
          <DailyReportDocumentCreate eventos={listActivesAffected ?? []} />
        </S.DailyReportContainer>
      )}
    </>
  );
};

export default DailyReport;
