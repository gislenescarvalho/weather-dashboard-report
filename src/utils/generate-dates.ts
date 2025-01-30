import { getNow } from './date-utils';

export function getLastSevenDays() {
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const today = getNow(); // Get the current date
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i); // Subtract days to get the last 7 days

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dayOfWeek = daysOfWeek[currentDate.getDay()];

    result.push([`${day}/${month}`, dayOfWeek]);
  }

  return result;
}

export const hours = [
  '09 h',
  '10 h',
  '11 h',
  '12 h',
  '13 h',
  '14 h',
  '15 h',
  '16 h',
  '17 h',
  '18 h',
  '19 h',
  '20 h',
  '21 h',
  '22 h',
  '23 h',
];
