import getConfig from 'next/config';
import Image from 'next/image';
import React from 'react';
import { getVersion } from 'src/service/version';
import useSWR from 'swr';

import * as S from './styles';
type IProps = {
  showVersion: boolean;
  showTitle?: boolean;
  showSource?: boolean;
  showPoweredBy?: boolean;
};

export const Footer = ({
  showVersion = true,
  showTitle = true,
  showSource = true,
  showPoweredBy = true,
}: IProps) => {
  const { publicRuntimeConfig } = getConfig();
  const frontendVersion = publicRuntimeConfig?.version;

  const [backendVersion, setVersion] = React.useState<string | null>(null);
  useSWR(
    'versao',
    async () => {
      const data = await getVersion();
      setVersion(data);
    },
    { revalidateOnMount: true },
  );

  return (
    <>
      <S.FooterContainer>
        <S.FooterDescription>
          {showTitle && (
            <span>
              Boletim Meteorológico by Eletrobras/Atmos (atmos@eletrobras.com)
            </span>
          )}
          {showSource && (
            <span>Fonte de dados: ECMWF | NCEP | CPTEC/INPE | Climatempo</span>
          )}
          {showPoweredBy && (
            <span>Powered by CEPEL - Todos os direitos reservados</span>
          )}
          {showVersion && (
            <span className="version">
              Back-end versão {backendVersion} - Front-end versão{' '}
              {frontendVersion}
            </span>
          )}
        </S.FooterDescription>
        <Image
          src="/icons/boletim/document/FooterIcons.svg"
          width={200}
          height={200}
          alt="Vento"
        />
      </S.FooterContainer>
    </>
  );
};
