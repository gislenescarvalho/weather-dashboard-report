export interface IBoletimActive {
  id: number;
  identificador: string;
  tipoAtivo: {
    id: number;
    identificador: string;
  };
  coordenadasStringLista: string;
}
