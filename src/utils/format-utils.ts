export default function formatParams(params: {
  [key: string]: unknown;
}): string {
  const queryString = Object.entries(params)
    .flatMap(([key, value]) => {
      // Ignora valores nulos ou undefined
      if (value === undefined || value === null) return [];

      // Verifica se o valor é um array
      if (Array.isArray(value)) {
        return value.map(v => `${key}=${v}`);
      }

      // Para valores únicos
      return `${key}=${value}`;
    })
    .join('&'); // Une os pares no formato key=value com "&"

  return queryString;
}
