export type Substation = {
  [key: string]: any;
  responsavel: string;
  subestacao: string;
  evento: string;
  ontem: string;
  ultimos7dias: string;
  ultimos30dias: string;
};
export type TransmissionLine = {
  [key: string]: any;
  responsavel: string;
  linha: string;
  evento: string;
  total: number;
  sobAtencao: number;
  ptInicial?: string;
  ptFinal?: string;
  ontem: string;
  ultimos7dias: string;
  ultimos30dias: string;
};

export type DailyReport = {
  previsionDates: string[];
  substation: Substation;
  transmissionLine: TransmissionLine;
};
