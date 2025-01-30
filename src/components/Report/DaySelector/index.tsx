import { addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { format, toZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { getNow } from 'src/utils/date-utils';

import * as S from './styles';

type DaySelectorProps = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  options: { dhPrevisao: any }[];
};

/**
 * DaySelector component.
 *
 * @param {object} props Component props.
 * @param {number} [props.selectedIndex=0] Initial selected index.
 * @param {function} [props.setSelectedIndex] Function to update the selected index.
 * @param {object[]} props.options Array of objects with `dhPrevisao` property.
 *
 * @returns {React.ReactElement} A React component with buttons to navigate
 * through the days of the week, and a text display of the selected day.
 */
const DaySelector: React.FC<DaySelectorProps> = ({
  selectedIndex,
  setSelectedIndex,
  options,
}) => {
  const [dates, setDates] = useState<any[]>([]);

  useEffect(() => {
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const timeZone = 'America/Sao_Paulo';
      const dateInTimeZone = toZonedTime(options[i]?.dhPrevisao, timeZone);

      return addDays(dateInTimeZone, i);
    });

    const newNext7Days = [...next7Days];

    const lastDate = newNext7Days[newNext7Days.length - 1];

    // Checa se o último dia é um dia inválido
    if (isNaN(lastDate.getTime())) {
      // Se inválido, soma o dia de hoje + seis para completar sete dias
      const today = getNow();
      today.setDate(today.getDate() + 6);

      // Substitue o dia inválido pelo dia de hoje somado a seis dias
      newNext7Days[newNext7Days.length - 1] = today;
    }

    setDates(newNext7Days.filter(item => !isNaN(item.getTime())));
  }, []);

  const formatDate = (date: string | number | Date) => {
    return date
      ? format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
      : '';
  };

  const handlePrevious = () =>
    setSelectedIndex && setSelectedIndex(selectedIndex - 1);
  const handleNext = () =>
    setSelectedIndex && setSelectedIndex(selectedIndex + 1);

  return (
    <S.SelectorContainer>
      <S.Button onClick={handlePrevious} disabled={selectedIndex === 0}>
        {selectedIndex > 0 && <S.Chevron direction="left" />}
      </S.Button>
      <S.DateDisplay>{formatDate(dates[selectedIndex])}</S.DateDisplay>
      <S.Button
        onClick={handleNext}
        disabled={selectedIndex === dates.length - 1}>
        {selectedIndex < dates.length - 1 && <S.Chevron direction="right" />}
      </S.Button>
    </S.SelectorContainer>
  );
};

export default DaySelector;
