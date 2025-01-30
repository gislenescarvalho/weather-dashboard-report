import { format, toZonedTime } from 'date-fns-tz';
import { DayNext } from 'src/models/dates/day-next';

const TIMEZONE = 'America/Sao_Paulo';

export const getNow = () => {
  return toZonedTime(new Date(), TIMEZONE);
};

export const buscarDataAtual = () => {
  const agora = toZonedTime(getNow(), TIMEZONE); // Ajusta para o fuso horário
  const formato = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', // Nome completo do dia
    day: 'numeric', // Número do dia
    month: 'long', // Nome completo do mês
    year: 'numeric', // Ano com 4 dígitos
    timeZone: TIMEZONE, // Fuso horário
  });

  const dataFormatada = formato.format(agora);
  return dataFormatada
    .split(' ')
    .map(palavra => {
      if (palavra === 'de') {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
};

export const formatarParaDDMMYYYY = (data: Date): string => {
  const zonedDate = toZonedTime(data, TIMEZONE);
  const dia = zonedDate.getDate().toString().padStart(2, '0');
  const mes = (zonedDate.getMonth() + 1).toString().padStart(2, '0');
  const ano = zonedDate.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export const formatarParaYYYYMMDD = (data: Date): string => {
  const zonedDate = toZonedTime(data, TIMEZONE);
  const dia = zonedDate.getDate().toString().padStart(2, '0');
  const mes = (zonedDate.getMonth() + 1).toString().padStart(2, '0');
  const ano = zonedDate.getFullYear();
  return `${ano}${mes}${dia}`;
};

export const getBoletimSumaryDate = (date: string) => {
  const hoje = toZonedTime(getNow(), TIMEZONE);
  const data = toZonedTime(date, TIMEZONE);

  const hojeSemHora = toZonedTime(
    Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
    TIMEZONE,
  );
  const dataSemHora = toZonedTime(
    Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()),
    TIMEZONE,
  );

  const diferencaDias =
    (dataSemHora.getTime() - hojeSemHora.getTime()) / (1000 * 60 * 60 * 24);

  if (diferencaDias === 0) {
    return 'Hoje';
  } else if (diferencaDias === 1) {
    return 'Amanhã';
  } else {
    return formatarParaDDMMYYYY(data);
  }
};

export const getNext7Days = (): DayNext[] => {
  const weekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  const days: DayNext[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = getNow();
    currentDate.setDate(currentDate.getDate() + i);
    const zonedDate = toZonedTime(currentDate, TIMEZONE);

    const weekDayName = weekDays[zonedDate.getDay()];
    const formattedDate = format(zonedDate, 'yyyy-MM-dd', {
      timeZone: TIMEZONE,
    });

    days.push({
      weekDayName,
      date: formattedDate,
    });
  }

  return days;
};

export const formatToDayAndMonthExtensive = (dateInput: string) => {
  const date = toZonedTime(dateInput, TIMEZONE);
  const formato = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    timeZone: TIMEZONE,
  });

  const dataFormatada = formato.format(date);
  return dataFormatada
    .split(' ')
    .map(palavra => {
      if (palavra === 'de') {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
};

export const generateThreeDates = () => {
  const dates = [];
  const currentDate = new Date();

  for (let i = 0; i < 3; i++) {
    // Extract day, month, year
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    // Format date as dd-mm-yyyy
    const formattedDate = `${day}-${month}-${year}`;
    dates.push(formattedDate);

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getFormattedDateTime = () => {
  const agora = toZonedTime(getNow(), TIMEZONE);

  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = String(agora.getFullYear());

  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');

  // Retorna a string no formato dd/mm/yyyy às XXh:XX
  return `${dia}/${mes}/${ano} às ${horas}h:${minutos}`;
};
