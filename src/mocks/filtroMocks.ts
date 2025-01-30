interface FilterData {
  type: string;
  iconLeft: string;
  title: string;
  buttons: string[];
}

const baseUrl = '/icons/';

const filtersMock: FilterData[] = [
  {
    type: 'previsao',
    iconLeft: `${baseUrl}/CalendarIcon.svg`,
    title: 'Filtrar por Data de Previsão',
    buttons: ['04/08/2024', '05/08/2024', '06/08/2024'],
  },
  {
    type: 'empresa',
    iconLeft: `${baseUrl}/WorkPlaceIcon.svg`,
    title: 'Filtrar por empresa',
    buttons: [
      'Todas as empresas',
      'Chesf',
      'Eletronorte',
      'Eletrosul',
      'Furnas',
    ],
  },
  {
    type: 'tipoAtivo',
    iconLeft: `${baseUrl}/RadioAntenaIcon.svg`,
    title: 'Filtrar por tipo de ativo',
    buttons: ['Avaliar todos os ativos', 'Linha de transmissão', 'Subestação'],
  },
  {
    type: 'tensao',
    iconLeft: `${baseUrl}/VoltIcon.svg`,
    title: 'Filtrar por classe de tensão',
    buttons: [
      'Nenhuma Classe de Tensão Selecionada',
      '750',
      '600',
      '525',
      '500',
      '345',
      '230',
      '138',
      '69',
      '34',
      '13',
      'Sem Classificação',
    ],
  },
];

export default filtersMock;
