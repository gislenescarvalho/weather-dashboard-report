/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer } from 'components/Footer';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {
  formatarParaYYYYMMDD,
  getFormattedDateTime,
  getNow,
} from 'src/utils/date-utils';
import { generateHtmlToPdf } from 'src/utils/pdf-utils';

import SubstationTable from '../DailyReportTable/SubstationTable';
import TransmissionLineTable from '../DailyReportTable/TransmissionLineTable';
import * as S from './styles';

type DailyReportDocumentCreateProps = {
  eventos?: any[];
};

/**
 * Componente responsável por renderizar o Boletim Diário em formato de documento PDF.
 *
 * @param eventos - Array de objetos contendo os dados do boletim diário.
 *
 * @returns JSX.Element
 */
const DailyReportDocumentCreate = ({
  eventos,
}: DailyReportDocumentCreateProps) => {
  const contentRef = useRef(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const handleExportPdf = async () => {
    if (contentRef.current) {
      try {
        setIsLoadingPdf(true);
        const nomeArquivo = `Boletim Meteorologia Eletrobras - ${formatarParaYYYYMMDD(
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

  return (
    <S.Container>
      <S.Content ref={contentRef}>
        <S.PageSection>
          <S.TitleContainer>
            <S.TitleDescription>Boletim Diário</S.TitleDescription>
            <S.ButtonsContainer>
              <S.Button onClick={handleExportPdf} disabled={isLoadingPdf}>
                <span>
                  {isLoadingPdf ? 'Gerando PDF ...' : 'Baixar Boletim em PDF'}
                </span>
                <Image
                  src="/icons/boletim/document/buttons/Download.svg"
                  width={15}
                  height={15}
                />
              </S.Button>
            </S.ButtonsContainer>
          </S.TitleContainer>
          <S.EmissionDate>
            Data de emissão: {getFormattedDateTime()}
          </S.EmissionDate>
          <S.Line />
        </S.PageSection>
        <S.PageSection>
          {'Mapa de Ativos Expostos'}
          <S.Line />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </S.PageSection>
        <S.PageSection>
          {/*
          <S.TitleDescription>
            {' '}
            Lista de ativos de transmissão sujeitos à condição meteorológica
            severa
          </S.TitleDescription>
          */}
          <S.TitleDescription> Tabela de Ativos</S.TitleDescription>
          <S.Line />
        </S.PageSection>
        <S.PageSection>
          {eventos &&
            eventos.map(item => (
              <S.DailyReportTableContainer key={item.date}>
                <h3>Data previsão: {item.date}</h3>
                <TransmissionLineTable dataTable={item.transmissionLine} />
                <SubstationTable dataTable={item.substation} />
              </S.DailyReportTableContainer>
            ))}
        </S.PageSection>

        <S.PageSection isFooter>
          <Footer showVersion={false} showSource={false} showTitle={false} />
        </S.PageSection>
      </S.Content>
    </S.Container>
  );
};

export default DailyReportDocumentCreate;
