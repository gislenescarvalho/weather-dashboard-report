import BoletimDocumentCreate from 'components/Boletim/BoletimDocumentCreate';
//import { BoletimDocumentFilterHome } from 'components/Boletim/BoletimDocumentFilter/BoletimDocumentFilterHome';
import BoletimEventosCard from 'components/Boletim/BoletimEventosCard';
import BoletimMenu from 'components/Boletim/BoletimMenu';
import BoletimModalInfo from 'components/Boletim/BoletimModalInfo';
import DailyForecast from 'components/Report/DailyForecast';
import HourlyForecast from 'components/Report/HourlyForecast';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Modal from 'react-modal';
import { useAuth } from 'src/hooks/useAuth';
import { getBoletimEspecialFromLatLong } from 'src/service/boletim';
import * as S from 'styles/pages/special-report.styles';
import useSWR from 'swr';

const SpecialReport: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [validData, setValidData] = useState(false); // Estado para controlar o menu selecionado
  const [selectedMenu, setSelectedMenu] = useState('Visão Geral'); // Estado para controlar o menu selecionado
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const openModal = () => setIsModalOpen(true);

  const onGoMap = () => {
    router.push('/boletim-map');
    setIsModalOpen(false);
  };

  const onGoHome = () => {
    router.push('/');
    setIsModalOpen(false);
  };

  const { data: data, isLoading: isLoadingActiveType } = useSWR(
    latitude && longitude
      ? `boletimLatLong_${latitude}_${longitude}` // Chave única para o SWR
      : null,
    async () => {
      const headers = {
        params: { latitude, longitude },
      };
      const data = await getBoletimEspecialFromLatLong(headers);
      if (data.length === 0) {
        openModal();
      }
      return data;
    },
    { revalidateOnMount: true },
  );

  useEffect(() => {
    if (router.isReady) {
      const { latitude, longitude, activeName } = router.query;
      if (!latitude || !longitude || !activeName) {
        router.push('/');
      }
      setValidData(true);
      setActiveName(activeName as string);
      setLatitude(parseFloat(latitude as string));
      setLongitude(parseFloat(longitude as string));
    }
  }, [router, router.isReady, router.query]);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Visão Geral':
        return (
          <>
            {isLoadingActiveType ? (
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
            ) : (
              <div style={{ paddingTop: '10rem' }}>
                {data && (
                  <>
                    <BoletimEventosCard
                      latitude={latitude ?? 0}
                      longitude={longitude ?? 0}
                      activeName={activeName ?? ''}
                      data={data}
                      showHeader={true}
                    />
                    <DailyForecast data={data} />
                    <br />
                    <br />
                    <br />
                    <HourlyForecast data={data} />
                    <Modal
                      isOpen={isModalOpen}
                      contentLabel="Editar Boletim"
                      style={{
                        content: {
                          height: '35rem',
                          width: '50%',
                          margin: 'auto',
                          padding: '20px',
                          borderRadius: '10px',
                        },
                      }}>
                      <BoletimModalInfo onGoMap={onGoMap} onGoHome={onGoHome} />
                    </Modal>
                  </>
                )}
              </div>
            )}
          </>
        );
      default:
        return (
          <div style={{ paddingTop: '12rem' }}>
            <BoletimDocumentCreate
              latitude={latitude ?? 0}
              longitude={longitude ?? 0}
              activeName={activeName ?? ''}
              eventos={data ?? []}
            />
          </div>
        );
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {validData && (
        <S.Container>
          <div style={{ padding: 30 }}>
            <S.MenuContainer>
              <BoletimMenu onMenuClick={menu => setSelectedMenu(menu)} />
            </S.MenuContainer>

            {renderContent()}
          </div>
        </S.Container>
      )}
    </>
  );
};

export default SpecialReport;
