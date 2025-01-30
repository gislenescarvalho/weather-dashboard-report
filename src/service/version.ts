import { atmosApi } from 'src/http/api';

export const getVersion = async () => {
  const url = `versao`;
  return atmosApi.get<string>(url).then(response => response.data);
};
