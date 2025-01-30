import { EnterprisesModel } from './enterprises';
import { TensionClassModel } from './tension-class';

type TipoAtivo = {
  id: number;
  identificador: string;
};

type Ativo = {
  id: number;
  identificador: string;
  tipoAtivo: TipoAtivo;
};

type CondicaoMeteorologica = {
  id: number;
  nome: string;
};

type Evento = {
  id: number;
  nome: string;
};

export type PrevisionModel = {
  id: number;
  objectid: string;
  ativo: Ativo;
  condicaoMeteorologica: CondicaoMeteorologica;
  evento: Evento;
  empresa: EnterprisesModel;
  classeTensao: TensionClassModel;
  dataAnalise: string; // ISO date string
  data: string; // ISO date string
  dataClassifica: string; // ISO date string
  obs: string;
  observacao: string | null;
};
