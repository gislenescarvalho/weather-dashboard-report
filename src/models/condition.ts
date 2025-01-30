export type AtivoType = {
  id: number;
  identificador: string;
  tipoAtivo: {
    id: number;
    identificador: string;
  };
};

export type CondicaoMeteorologicaType = {
  id: number;
  nome: string;
};

export type EventoType = {
  id: number;
  nome: string;
};

export type EmpresaType = {
  id: number;
  nome: string;
};

export type ClasseTensaoType = {
  id: number;
  identificador: string;
};

export type ConditionModel = {
  id: number;
  objectid: string;
  ativo: AtivoType;
  condicaoMeteorologica: CondicaoMeteorologicaType;
  evento: EventoType;
  empresa: EmpresaType;
  classeTensao: ClasseTensaoType;
  dataAnalise: string;
  data: string;
  dataClassifica: string;
  obs: string;
  observacao: string | null;
  mean_val_precipitacao_acum_01_d: number;
  mean_val_precipitacao_acum_07_d: number;
  mean_val_precipitacao_acum_15_d: number;
  mean_val_precipitacao_acum_30_d: number;
  max_val_precipitacao_acum_01_di: number;
  max_val_precipitacao_acum_07_di: number;
  max_val_precipitacao_acum_15_di: number;
  max_val_precipitacao_acum_30_di: number;
  eventoMeteorologico: string;
  extensaoAfetada: number;
  extensaoTotalAfetada: number;
};
