import { atmosApi } from 'src/http/api';
import { IBoletimActive } from 'src/models/boletim/boletim-active';
import { IBoletimSummary } from 'src/models/boletim/boletim-summary';
import { RequestHeaders } from 'src/types/request';
import formatParams from 'src/utils/format-utils';

export const getBoletimEspecialFromLatLong = async (
  headers?: RequestHeaders,
) => {
  const params = formatParams(headers?.params ?? {});
  const url = `boletim-especial?${params}`;
  return atmosApi.get<IBoletimSummary[]>(url).then(response => response.data);
};

export const getBoletimActives = async (
  headers?: RequestHeaders,
): Promise<IBoletimActive[]> => {
  const params = formatParams(headers?.params ?? {});
  const url = `filtro-dashboard/ativos-geral?${params}&limitado=false`;
  return atmosApi.get<IBoletimActive[]>(url).then(response => response.data);
};

export const getImportData = async () => {
  const url = `/labgis/importar-dados`;
  const response = atmosApi.get<any>(url).then(response => response || {});
  return response;
};

export const getImportStatus = async () => {
  const url = `labgis/importacao-progresso`;
  const response = atmosApi.get<any>(url).then(response => response || {});
  return response;
};

export const publishAgain = async () => {
  const url = `/labgis/forcar-importar-dados`;
  const response = atmosApi.get<any>(url).then(response => response || {});
  return response;
};
