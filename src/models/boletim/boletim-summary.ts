export interface IBoletimSummary {
  dh_previsao: string;
  vl_chuva_periodo: number;
  temperatura_max: number;
  temperatura_min: number;
  umidade_max: number;
  umidade_min: number;
  vento_rajada_max: number;
  vento_velocidade_avg: number;
  previsaoBoletimEspecialLista: IBoletimEspecial[];
}

export interface IBoletimEspecial {
  gePontoModelo: string;
  vlLatitude: number;
  vlLongitude: number;
  dtModelo: string;
  dhPrevisao: string;
  dsDeslocamentoTempo: string;
  vlTemperatura: number;
  vlTemperaturaMaxima: number;
  vlTemperaturaMinima: number;
  vlVolumeChuvaTotal: number;
  vlUmidadeRelativa: number;
  vlVentoRajada: number;
  vlVentoVelocidadeNorte: number;
  vlVentoVelocidadeLeste: number;
  vlVentoVelocidade: number;
}
