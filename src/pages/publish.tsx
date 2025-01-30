import Publish from 'components/Publish';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {
  getImportData,
  getImportStatus,
  publishAgain,
} from 'src/service/boletim';
import { containsSubstring } from 'src/utils/string-utils';
import * as S from 'styles/pages/publish.styles';
import useSWR from 'swr';

const PublishPage = () => {
  const [importMessages, setImportMessages] = useState<string>();
  const [isImportingStatus, setIsImportingStatus] = useState(false);
  const [isImportDataLoaded, setIsImportDataLoaded] = useState(false);

  const {
    data,
    error,
    mutate: swrMutate,
  } = useSWR(
    'importStatus',
    async () => {
      const { data } = await getImportStatus();
      if (containsSubstring(data, 'Nenhuma importação em andamento')) {
        return 'Nenhuma importação em andamento';
      }

      setIsImportingStatus(true);

      if (data) {
        // Transformar o log em um array de linhas
        const lines = data.trim().split('\n');

        // Obter a última linha
        const lastLine = lines[lines.length - 1];

        if (
          containsSubstring(lastLine, 'Importação concluída') &&
          isImportingStatus
        ) {
          setIsImportingStatus(false);
        }
      }

      setImportMessages(data);
      return data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      enabled: isImportDataLoaded,
    },
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isImportingStatus === true) {
      interval = setInterval(() => {
        swrMutate('importStatus');
      }, 2000); // Update every 2 seconds
    }

    return () => clearInterval(interval);
  }, [isImportingStatus, swrMutate]);

  const handlePublishClick = async () => {
    try {
      setIsImportingStatus(true);

      const { data: importData } = await getImportData();
      if (importData) {
        setIsImportDataLoaded(true);
        setImportMessages(importData);
      }
    } catch (err: any) {
      if (err.response) {
        console.error(err.response.data);
        setImportMessages(err.response.data);
      }
      setIsImportingStatus(false);
      setIsImportDataLoaded(false);
    }
  };

  const handleButtonClickImportAgain = async () => {
    if (confirm('Deseja realmente re-publicar os dados?')) {
      try {
        setIsImportingStatus(true);
        const { data: importData } = await publishAgain();
        if (importData) {
          setIsImportDataLoaded(true);
          setImportMessages(importData);
        }
      } catch (err: any) {
        if (err.response) {
          console.error(err.response.data);
          setImportMessages(err.response.data);
        }
        setIsImportingStatus(false);
        setIsImportDataLoaded(false);
      }
    }
  };

  if (error) {
    return (
      <S.PageContainer>
        <div className="error">Erro ao carregar os dados</div>
      </S.PageContainer>
    );
  }

  if (!data) {
    return (
      <S.PageContainer>
        <div className="loading">
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#0088cc"
            radius="9"
            ariaLabel="three-dots-loading"
          />
          <div>Carregando...</div>
        </div>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <Publish
        handleButtonClick={handlePublishClick}
        handleButtonClickImportAgain={handleButtonClickImportAgain}
        importStatus={importMessages ?? 'Nenhuma importação em andamento'}
        isDisabled={isImportingStatus}
      />
    </S.PageContainer>
  );
};

export default PublishPage;
