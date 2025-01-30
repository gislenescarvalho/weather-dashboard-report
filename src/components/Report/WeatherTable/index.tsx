import React, { memo } from 'react';

import * as S from './styles';

type DataProps = {
  dhPrevisao: string; // ISO string for datetime of forecast
  dsDeslocamentoTempo: string; // Time displacement as a string
  dtModelo: string; // ISO string for model datetime
  gePontoModelo: string; // WKT representation of a geographical point
  vlLatitude: number; // Latitude value
  vlLongitude: number; // Longitude value
  vlTemperatura: number; // Current temperature
  vlTemperaturaMaxima: number; // Maximum temperature
  vlTemperaturaMinima: number; // Minimum temperature
  vlUmidadeRelativa: number; // Relative humidity
  vlVentoMaxRajada: number; // Maximum gust wind speed
  vlVentoMedio: number; // Average wind speed
  vlVentoVelocidadeLeste: number; // Wind speed in the eastward direction
  vlVentoVelocidadeNorte: number; // Wind speed in the northward direction
  vlVolumeChuvaTotal: number; // Total rainfall volume
  vlChuvaPeriodo: number;
};

type WeatherTableProps = {
  data?: DataProps[];
  hideLegend?: boolean;
  documentTitle?: string;
};

const WeatherTable = ({
  data,
  hideLegend,
  documentTitle,
}: WeatherTableProps) => {
  const tableValues =
    data?.map(item => ({
      time: new Date(item.dhPrevisao).toTimeString().split(' ')[0],
      precipitation: Math.round(item.vlChuvaPeriodo),
      temperature: Math.round(item.vlTemperatura),
      humidity: Math.round(item.vlUmidadeRelativa),
      windMax: Math.round(item.vlVentoMaxRajada),
      windAvg: Math.round(item.vlVentoMedio),
    })) ?? [];

  const validatePrecipitationColor = (value: number) => {
    if (value <= 2.5) {
      return 'low';
    }
    if (value > 2.5 && value <= 10) {
      return 'moderated';
    }
    if (value > 10 && value <= 50) {
      return 'strong';
    }
    if (value > 50) {
      return 'toStrong';
    }
  };

  const validateTemperatureColor = (value: number) => {
    if (value <= 5) {
      return 'toLow';
    }
    if (value > 5 && value <= 20) {
      return 'low';
    }
    if (value > 20 && value <= 35) {
      return 'normal';
    }
    if (value > 35 && value <= 40) {
      return 'high';
    }
    if (value > 40) {
      return 'toHigh';
    }
  };

  const validateHumidityColor = (value: number) => {
    if (value <= 25) {
      return 'low';
    }
    if (value > 25 && value <= 50) {
      return 'normal';
    }
    if (value > 50 && value <= 70) {
      return 'moderated';
    }
    if (value > 70 && value <= 100) {
      return 'high';
    }
  };

  const validateWindColor = (value: number) => {
    if (value <= 19) {
      return 'low';
    }
    if (value > 19 && value <= 49) {
      return 'moderated';
    }
    if (value > 50) {
      return 'strong';
    }
  };

  return (
    <S.Container>
      {documentTitle && <S.Title>{documentTitle}</S.Title>}
      <S.Table>
        {tableValues && tableValues.length > 0 && (
          <thead>
            <tr>
              <th>Horário de previsão</th>
              <th>Precipitação (mm)</th>
              <th>Temperatura (°C)</th>
              <th>Umidade (%)</th>
              <th>Vento (km/h) - Máximo</th>
              <th>Vento (km/h) - Medio</th>
            </tr>
          </thead>
        )}
        <tbody>
          {tableValues.map((row, index) => (
            <tr key={index}>
              <td>{row.time}</td>
              <td className={`precipitation`}>
                <div className={validatePrecipitationColor(row.precipitation)}>
                  {row.precipitation}
                </div>
              </td>
              <td className="temperature">
                <div className={validateTemperatureColor(row.temperature)}>
                  {row.temperature}
                </div>
              </td>
              <td className="humidity">
                <div className={validateHumidityColor(row.humidity)}>
                  {row.humidity}
                </div>
              </td>
              <td className="wind">
                <div className={validateWindColor(row.windMax)}>
                  {row.windMax}
                </div>
              </td>
              <td className="wind">
                <div className={validateWindColor(row.windAvg)}>
                  {row.windAvg}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
      {!hideLegend && (
        <S.LegendContainer>
          <S.LegendColumn>
            <S.LegendTitle>Classificação Precipitacação (mm):</S.LegendTitle>
            <S.Legend>
              <S.LegendColor color="#00A61C" />
              <span>{`Fraca (0 < Precipitacação <= 2,5)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FFCD05" />
              <span>{`Moderada (2,5 < Precipitação <= 10)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FF7903" />
              <span>{`Forte (10 < Precipitação <= 50)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FF0000" />
              <span>{`Muito Forte (Precipitação > 50)`}</span>
            </S.Legend>
          </S.LegendColumn>

          <S.LegendColumn>
            <S.LegendTitle>Classificação Temperatura do Ar (°C):</S.LegendTitle>
            <S.Legend>
              <S.LegendColor color="#FF0000" />
              <span>{`Muito Baixa  (T <= 5)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FFCD05" />
              <span>{`Baixa  (5 < T <= 20)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#00A61C" />
              <span>{`Normal (20 < T <= 35)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FFCD05" />
              <span>{`Alta (35 < T <= 40)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FF0000" />
              <span>{`Muito Alta (T > 40)`}</span>
            </S.Legend>
          </S.LegendColumn>

          <S.LegendColumn>
            <S.LegendTitle>
              Classificação Umidade Relativa do Ar (%):
            </S.LegendTitle>
            <S.Legend>
              <S.LegendColor color="#FF0000" />
              <span>{`Prejudicial ao ser humano (0 <= ur <= 25)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#00A61C" />
              <span>{`Normal (25 < ur <= 50)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FFCD05" />
              <span>{`Moderada (50 < ur <= 70)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FF0000" />
              <span>{`Alta (70 < ur <= 100)`}</span>
            </S.Legend>
          </S.LegendColumn>

          <S.LegendColumn>
            <S.LegendTitle>
              Classificação Intensidade do Vento (km/h):
            </S.LegendTitle>
            <S.Legend>
              <S.LegendColor color="#00A61C" />
              <span>{`Fraca (0 < V <= 19)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FFCD05" />
              <span>{`Moderada (19 < V <= 49)`}</span>
            </S.Legend>
            <S.Legend>
              <S.LegendColor color="#FF0000" />
              <span>{`Forte (V > 50)`}</span>
            </S.Legend>
          </S.LegendColumn>
        </S.LegendContainer>
      )}
    </S.Container>
  );
};

export default memo(WeatherTable);
