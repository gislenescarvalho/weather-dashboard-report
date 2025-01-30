/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer } from 'components/Footer';
import DailyForecastSingle from 'components/Report/DailyForecastSingle';
import WeatherTable from 'components/Report/WeatherTable';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { IBoletimSummary } from 'src/models/boletim/boletim-summary';
import { AVAILABLE_CHARTS } from 'src/utils/chart-utils';
import {
  buscarDataAtual,
  formatarParaYYYYMMDD,
  formatToDayAndMonthExtensive,
  getNow,
} from 'src/utils/date-utils';
import { generateHtmlToPdf } from 'src/utils/pdf-utils';
import { roundCoordinates } from 'src/utils/string-utils';

import BoletimEventosCard from '../BoletimEventosCard';
import * as S from './styles';

type BoletimDocumentCreateProps = {
  eventos: IBoletimSummary[];
  activeName: string;
  latitude: number;
  longitude: number;
};

const BoletimDocumentCreate = ({
  eventos,
  activeName,
  latitude,
  longitude,
}: BoletimDocumentCreateProps) => {
  const contentRef = useRef(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const handleExportPdf = async () => {
    if (contentRef.current) {
      try {
        setIsLoadingPdf(true);
        const nomeArquivo = `atmos_bolesp_meteoro_${formatarParaYYYYMMDD(
          getNow(),
        )}.pdf`;
        await generateHtmlToPdf(contentRef, nomeArquivo);
      } catch (error) {
        console.info(error);
      } finally {
        setIsLoadingPdf(false);
      }
    }
  };

  const tableArray = Array.from({ length: 7 }, (_, i) => {
    const array = [];
    const date = new Date(eventos[i]?.dh_previsao);
    date.setHours(date.getHours() + 3); // Adiciona 3 horas
    array.push({
      dhPrevisao: formatToDayAndMonthExtensive(eventos[i]?.dh_previsao),
      previsaoBoletimEspecialLista: eventos[i]?.previsaoBoletimEspecialLista,
    });
    return array;
  });

  const mappedTableArray = tableArray.map(item => item[0]);

  const roundLatLongCoordinates = roundCoordinates(latitude, longitude);
  const { lat, long } = roundLatLongCoordinates;

  return (
    <S.Container>
      <S.Wrapper>
        <S.ButtonsContainer>
          {/*<S.Button primary>
            <span>Gerar Novo Boletim</span>
            <Image
              src="/icons/boletim/document/buttons/CreateNew.svg"
              width={15}
              height={15}
            />
          </S.Button>*/}
          <S.Button onClick={handleExportPdf} disabled={isLoadingPdf}>
            <span>{isLoadingPdf ? 'Gerando PDF ...' : 'Baixar PDF'}</span>
            <Image
              src="/icons/boletim/document/buttons/Download.svg"
              width={15}
              height={15}
            />
          </S.Button>
        </S.ButtonsContainer>
        <S.Content ref={contentRef}>
          <S.PageSection>
            <S.TitleContainer>
              <S.TitleLogo>
                <Image
                  src={'/icons/logo/EletrobrasLogo.svg'}
                  width={200}
                  height={55}
                  alt="Eletrobras Logo"
                />
              </S.TitleLogo>
              <S.TitleDescription>
                Boletim Meteorológico Especial
              </S.TitleDescription>
            </S.TitleContainer>
            <S.Description>
              <h1>{activeName}</h1>
              <S.ContainerHeaderLatLong>
                Latitude: {lat} / Longitude: {long}
              </S.ContainerHeaderLatLong>
              <h2 style={{ marginTop: '1rem' }}>
                Data de emissão: {buscarDataAtual()}
              </h2>

              <S.DescriptionText>
                Gerado automaticamente pelo sistema de previsão do ATMOS -
                Centro Integrado de Monitoramento e Inteligência Meteorológica
                da Eletrobras
              </S.DescriptionText>

              <S.DescriptionTextContainer>
                <S.DescriptionText>
                  Contato dos meteorologistas:
                </S.DescriptionText>
                <S.DescriptionContactsText>
                  atmos@eletrobras.com | Daniele Ornelas: 21 2528-5480 | Marcelo
                  Belassiano: 21 2528-5482 | Pedro Jourdan: 21 2528-3010 |
                  Jonatha Soares: 21 2528-5480
                </S.DescriptionContactsText>
              </S.DescriptionTextContainer>

              {/* <span>Contato dos Metereologistas:</span> */}

              {/* <div className="observations">
                <span>Observações:</span>
                <span>Observações de exemplo para marcação de texto</span>
              </div> */}
            </S.Description>
            <S.PrevisionWrapper>
              <BoletimEventosCard
                latitude={latitude ?? 0}
                longitude={longitude ?? 0}
                activeName={activeName ?? ''}
                data={eventos}
                showHeader={false}
                itemsLarge={0}
              />
            </S.PrevisionWrapper>
          </S.PageSection>

          {AVAILABLE_CHARTS.map((item, idx) => (
            <S.PageSection key={idx}>
              <S.TableDescription>
                <h1>
                  Previsão - {item.value} ({item.unit})
                </h1>
              </S.TableDescription>
              <DailyForecastSingle chart={item} data={eventos} />
            </S.PageSection>
          ))}

          <S.PageSection>
            <S.TableDescription>
              <h1>Previsões por Intervalo de Hora</h1>
            </S.TableDescription>
            <S.TableDescriptionAlert>
              <strong>ATENÇÃO: </strong> A previsibilidade das condições de
              tempo para períodos superiores a três dias é baixa. Assim, a
              previsão do tempo deve ser usada com cautela
            </S.TableDescriptionAlert>
          </S.PageSection>
          <br />
          {mappedTableArray.map((item, idx) => (
            <S.PageSection key={`${item.dhPrevisao}-${idx}`}>
              <WeatherTable
                documentTitle={item.dhPrevisao}
                hideLegend={idx !== mappedTableArray.length - 1}
                data={item.previsaoBoletimEspecialLista as any}
              />
              <br />
            </S.PageSection>
          ))}
          <S.PageSection isFooter>
            <Footer showVersion={false} />
          </S.PageSection>
        </S.Content>
      </S.Wrapper>
    </S.Container>
  );
};

export default BoletimDocumentCreate;
