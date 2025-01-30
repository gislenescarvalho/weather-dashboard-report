import { atmosApi } from 'src/http/api';
import { ActivesModel, AffectedActiveTotalModel } from 'src/models/atives';
import { ConditionModel } from 'src/models/condition';
import { ConditionType } from 'src/models/condition-type';
import { EnterprisesModel } from 'src/models/enterprises';
import { TensionClassModel } from 'src/models/tension-class';
import { RequestHeaders } from 'src/types/request';
import formatParams from 'src/utils/format-utils';

export const getLastUpdatedDate = () =>
  atmosApi.get<Date>('filtro-dashboard/data-ultima-atualizacao');

export const getAvailableEnterprises = async () => {
  const { data } = await atmosApi.get<EnterprisesModel[]>(
    'filtro-dashboard/empresas-diponiveis',
  );
  data.unshift({ id: 0, nome: 'Todas as empresas' });
  return data;
};

export const getAvailableActiveType = async () => {
  const { data } = await atmosApi.get<ActivesModel[]>(
    'filtro-dashboard/tipo-ativo-diponiveis',
  );
  data.unshift({ id: 0, identificador: 'Avaliar todos os ativos' });
  const formatedData = data.map(value => {
    if (value.identificador.includes('SE')) {
      return { ...value, identificador: 'Subestação' };
    }
    if (value.identificador.includes('LT')) {
      return { ...value, identificador: 'Linha de transmissão' };
    }
    return value;
  });

  return formatedData;
};

export const getAvailableDates = async () => {
  const { data } = await atmosApi.get<string[]>(
    'filtro-dashboard/datas-diponiveis',
  );

  const formatedDates = data.map((value, index) => {
    const date = new Date(value);
    date.setHours(date.getHours() + 3); // Adiciona 3 horas
    return {
      id: index,
      date: date.toLocaleDateString('pt-BR'), // Formata para 'dd/MM/yyyy'
      raw: value,
    };
  });

  return formatedDates;
};

export const getActivesCoordinates = (headers?: RequestHeaders) =>
  atmosApi.get<ConditionModel[]>(
    'filtro-dashboard/coords-ativos-previsao-afetados-condicao',
    headers,
  );

export const getConditions = async () => {
  const { data } = await atmosApi.get<ConditionType[]>(
    'filtro-dashboard/condicoes-diponiveis',
  );
  data.unshift({ id: 0, nome: 'Todas condições avaliadas' });

  return data;
};

export const getTensionClass = async () => {
  const { data } = await atmosApi.get<TensionClassModel[]>(
    'filtro-dashboard/classe-tensao',
  );
  data.unshift({ id: 0, identificador: 'Todas as classes' });

  return data;
};

export const getCoordsActivesPrevisionAffecteds = (
  headers?: RequestHeaders,
) => {
  const params = formatParams(headers?.params ?? {});
  const url = `filtro-dashboard/coords-ativos-previsao-afetados-condicao?${params}`;
  return atmosApi.get<ConditionModel[]>(url);
};

export const getActivesPrevisionAffecteds = (headers?: RequestHeaders) => {
  const params = formatParams(headers?.params ?? {});
  const url = `filtro-dashboard/ativos-previsao-afetados-condicao?${params}`;
  return atmosApi.get<ConditionModel[]>(url);
};

export const getTotalsByActiveType = (headers?: RequestHeaders) => {
  const params = formatParams(headers?.params ?? {});
  const url = `filtro-dashboard/totais-por-tipo-ativo?${params}`;
  return atmosApi.get<AffectedActiveTotalModel[]>(url);
};

export const getPrevisionGeneralDataRequest = async (date: string) => {
  const url = `filtro-dashboard/previsao-geral-por-data?data=${date}`;
  const { data } = await atmosApi.get<any>(url);
  return data;
};

export const getLastUpdateDate = (headers?: RequestHeaders) =>
  atmosApi.get<string>('/filtro-dashboard/data-ultima-atualizacao', headers);

export const getEventPoints = async (date: string): Promise<any[]> => {
  const { data } = await atmosApi.get<any>(
    `/filtro-dashboard/pontos-eventos?data=${date}`,
  );

  const geoJsonFeatures: any[] = data.features;

  const getImage = (event: string) => {
    if (event === 'Temperatura') {
      return '/icons/marker-temperature.png';
    }
    if (event === 'Chuva') {
      return '/icons/marker-precipitation.png';
    }
    if (event === 'Vento') {
      return '/icons/marker-spring.png';
    }
    return '/icons/marker-precipitation.png';
  };

  const geoJSONFormatted = geoJsonFeatures.map(feature => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [feature.geometry.x, feature.geometry.y], // Longitude, Latitude
    },
    properties: {
      image: getImage(feature.attributes.evento),
    },
  }));

  return geoJSONFormatted;
};
