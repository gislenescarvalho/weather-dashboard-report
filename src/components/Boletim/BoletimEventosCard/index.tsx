import { Card } from 'components/Card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IBoletimSummary } from 'src/models/boletim/boletim-summary';
import {
  buscarDataAtual,
  formatarParaDDMMYYYY,
  getBoletimSumaryDate,
} from 'src/utils/date-utils';
import { roundCoordinates } from 'src/utils/string-utils';

import * as S from './styles';

interface IProps {
  data: IBoletimSummary[];
  showHeader: boolean;
  latitude: number;
  longitude: number;
  activeName: string;
  itemsLarge?: number;
}
const BoletimEventosCard = ({
  data,
  showHeader,
  activeName,
  latitude,
  longitude,
  itemsLarge = 2,
}: IProps) => {
  const [dataAtual, setDataAtual] = useState('');
  const router = useRouter();

  useEffect(() => {
    setDataAtual(buscarDataAtual());
  }, []);

  const handleOpenMap = async () => {
    router.push(`/boletim-map`);
  };

  const dataModelo = data[0]?.previsaoBoletimEspecialLista[0]?.dtModelo;

  const roundLatLongCoordinates = roundCoordinates(latitude, longitude);
  const { lat, long } = roundLatLongCoordinates;

  return (
    <>
      <S.Container>
        {showHeader && (
          <S.ContainerHeader>
            <S.ContainerHeaderTitle>
              {activeName}
              <S.ContainerHeaderTitleIcon onClick={handleOpenMap}>
                <Image
                  src="/icons/boletim/Edit.svg"
                  width={30}
                  height={30}
                  alt="Editar"
                />
              </S.ContainerHeaderTitleIcon>
            </S.ContainerHeaderTitle>
            <S.ContainerHeaderLatLong>
              Latitude: {lat} / Longitude: {long}
            </S.ContainerHeaderLatLong>
            <S.ContainerHeaderSubTitleDiv>
              <S.ContainerHeaderSubTitle>
                {dataAtual} |{' '}
              </S.ContainerHeaderSubTitle>
              <S.ContainerHeaderSubTitleUpdatedDate>
                Última atualização em{' '}
                {formatarParaDDMMYYYY(new Date(dataModelo))}
              </S.ContainerHeaderSubTitleUpdatedDate>
            </S.ContainerHeaderSubTitleDiv>
          </S.ContainerHeader>
        )}

        <S.ContainerBody>
          {data != null &&
            data.map((item, index) => (
              <S.Item key={index}>
                <Card.Wrapper>
                  <Card.Header>
                    <S.ItemHeader>
                      <span>{getBoletimSumaryDate(item.dh_previsao)}</span>
                    </S.ItemHeader>
                  </Card.Header>
                  <Card.Body>
                    <S.ItemBody>
                      <S.ItemTemparatureContent large={index < itemsLarge}>
                        <S.ItemImageTemperature>
                          <Image
                            src="/icons/boletim/Temperatura.svg"
                            width={40}
                            height={40}
                            alt="Temperatura"
                          />
                        </S.ItemImageTemperature>
                        <S.ItemBodyTemperature large={false}>
                          <span>{Math.round(item.temperatura_max)}°C</span>
                          <span>{Math.round(item.temperatura_min)}°C</span>
                        </S.ItemBodyTemperature>
                      </S.ItemTemparatureContent>
                      <S.ItemBodyWheather>
                        <S.ItemBodyWheatherItem>
                          <Image
                            src="/icons/boletim/Vento.svg"
                            width={30}
                            height={30}
                            alt="Vento"
                          />
                          <span>{Math.round(item.vento_rajada_max)} km/h</span>
                        </S.ItemBodyWheatherItem>
                        <S.ItemBodyWheatherItem>
                          <Image
                            src="/icons/boletim/Humidity.svg"
                            width={30}
                            height={30}
                            alt="Umidade"
                          />
                          <S.ItemBodyWheatherHumidity>
                            <span>{Math.round(item.umidade_max)}%</span>
                            <span>{Math.round(item.umidade_min)}%</span>
                          </S.ItemBodyWheatherHumidity>
                        </S.ItemBodyWheatherItem>
                        <S.ItemBodyWheatherItem>
                          <Image
                            src="/icons/boletim/Chuva.svg"
                            width={30}
                            height={30}
                            alt="Chuva"
                          />
                          <span>{Math.round(item.vl_chuva_periodo)} mm</span>
                        </S.ItemBodyWheatherItem>
                      </S.ItemBodyWheather>
                    </S.ItemBody>
                  </Card.Body>
                </Card.Wrapper>
              </S.Item>
            ))}
        </S.ContainerBody>
        <S.ItemLegends>
          <S.ItemLegendsTitle>Legenda Ícones: </S.ItemLegendsTitle>
          <S.ItemLegendsIcon>
            <Image
              src="/icons/boletim/Temperatura.svg"
              width={30}
              height={30}
              alt="Temperatura"
            />
            <span>Temperatura do ar</span>
          </S.ItemLegendsIcon>
          <S.ItemLegendsIcon>
            <Image
              src="/icons/boletim/Vento.svg"
              width={30}
              height={30}
              alt="Vento"
            />
            <span>Intensidade do Vento</span>
          </S.ItemLegendsIcon>
          <S.ItemLegendsIcon>
            <Image
              src="/icons/boletim/Humidity.svg"
              width={30}
              height={30}
              alt="Umidade"
            />
            <span>Umidade do ar</span>
          </S.ItemLegendsIcon>
          <S.ItemLegendsIcon>
            <Image
              src="/icons/boletim/Chuva.svg"
              width={30}
              height={30}
              alt="Chuva"
            />
            <span>Precipitação</span>
          </S.ItemLegendsIcon>
        </S.ItemLegends>
      </S.Container>
    </>
  );
};

export default BoletimEventosCard;
