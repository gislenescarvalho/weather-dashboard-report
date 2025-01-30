import React, { useState } from 'react';
import { DayNext } from 'src/models/dates/day-next';
import {
  formatToDayAndMonthExtensive,
  getNext7Days,
} from 'src/utils/date-utils';

import * as S from './styles';

export const BoletimDocumentFilterHeader = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days: DayNext[] = getNext7Days();

  const handleDayClick = (date: DayNext) => {
    if (selectedDays.includes(date.date)) {
      // Removendo um dia selecionado
      setSelectedDays(selectedDays.filter(day => day !== date.date));
    } else {
      // Adicionando um novo dia selecionado
      setSelectedDays([...selectedDays, date.date]);
    }
  };

  const firstSelectedDay = selectedDays[0]; // Pega o primeiro dia selecionado

  return (
    <S.Container>
      <S.Title>Selecione os dados do boletim especial</S.Title>
      <S.Subtitle>
        Informe as variáveis meteorológicas, os dias e os intervalos de horário
        que devem ser incluídos no documento final
      </S.Subtitle>
      <S.DaysWrapper>
        {days.map(day => {
          const isActive = selectedDays.includes(day.date);
          const showArrow = day.date === firstSelectedDay; // Mostra seta apenas no primeiro selecionado

          return (
            <S.DayCard
              key={day.date}
              active={isActive}
              showArrow={showArrow}
              onClick={() => handleDayClick(day)}>
              <span>{day.weekDayName}</span>
              <small>{formatToDayAndMonthExtensive(day.date)}</small>
            </S.DayCard>
          );
        })}
      </S.DaysWrapper>
    </S.Container>
  );
};
