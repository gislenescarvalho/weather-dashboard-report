import Map from 'components/Map';
import PopupModal from 'components/PopupModal';
import { useRouter } from 'next/router'; // Importar o hook useRouter
import React, { useState } from 'react';
import Modal from 'react-modal';
import { IBoletimActive } from 'src/models/boletim/boletim-active';
import { IGeoJson } from 'src/models/geo-json';
import { getBoletimActives } from 'src/service/boletim';
import useSWR from 'swr';

import BoletimActivesAffectedsList from '../BoletimActivesAffectedsList';
import GeoJsonMap from './GeoJsonMap';
// import GeoJsonMap from './GeoJsonMap';
import * as S from './styles';

const BoletimMap = () => {
  const [selectedLatLong, setSelectedLatLong] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [listActives, setListActives] = useState<IBoletimActive[]>([]);
  const [selectedActive, setSelectedActive] = useState<IBoletimActive>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isModalCoordOpen, setIsModalCoordOpen] = useState(false);
  const [listaGeoJsonData, setListaGeoJsonData] = useState<IGeoJson[]>([]);
  const [mapZoom, setMapZoom] = useState<number>(10);
  const [isFilteredList, setIsFilteredList] = useState<boolean>(false);
  const [isInformativeModalOpen, setIsInformativeModalOpen] =
    useState<boolean>(false);

  const navigate = useRouter();

  const handleLatLongSelection = (lat: number, lng: number) => {
    setSelectedLatLong({ lat, lng });
  };

  const { isLoading: isLoadingListaGeoJsonData } = useSWR(
    'boletimActives',
    async () => {
      const data = await getBoletimActives();
      setListActives(data);
      setGeoJsonList(data);
    },
    { revalidateOnMount: true },
  );

  const setGeoJsonList = (data: IBoletimActive[]) => {
    const list: IGeoJson[] = data.map((item: IBoletimActive) => ({
      type: 'Feature',
      geometry: {
        type:
          item.tipoAtivo.identificador === 'LT' ? 'MultiLineString' : 'Polygon',
        coordinates: JSON.parse(item.coordenadasStringLista),
      },
    }));

    setListaGeoJsonData(list);
  };

  const handleSetActiveData = (data: IBoletimActive) => {
    if (selectedActive?.id === data.id) {
      setSelectedActive(undefined);
      setMapZoom(10);
      setGeoJsonList(listActives);
      setIsFilteredList(false);
      return;
    }
    //Filtrar por identificador
    const filteredData = listActives.filter(
      active => active.identificador === data.identificador,
    );

    setMapZoom(100);
    setGeoJsonList(filteredData);
    setSelectedActive(data);
    setIsFilteredList(true);
    setIsInformativeModalOpen(true);
  };

  const handleSpecialBoletimClick = async () => {
    if (!selectedLatLong || !selectedActive) {
      return;
    }
    navigate.push(
      `/special-report?latitude=${selectedLatLong.lat}&longitude=${selectedLatLong.lng}&&activeName=${selectedActive?.identificador}`,
    );
  };

  const handleGoHomeClick = () => {
    navigate.push('/'); // Redirecionar para a página inicial
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalCoordOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isLoadingListaGeoJsonData}
        contentLabel="Selecione Ativo"
        style={{
          content: {
            height: '25rem',
            width: '60rem',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
          },
        }}>
        <PopupModal description={['Carregando dados...']} buttons={[]} />
      </Modal>
      <Modal
        isOpen={isModalCoordOpen}
        contentLabel="Selecione Ativo"
        style={{
          content: {
            height: '25rem',
            width: '60rem',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
          },
        }}>
        <PopupModal
          description={['Selecione um ativo para selecionar a coordenada.']}
          buttons={[{ text: 'Ok', isGreen: true, onClick: handleOk }]}
        />
      </Modal>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Selecione Ativo"
        style={{
          content: {
            height: '25rem',
            width: '60rem',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
          },
        }}>
        <PopupModal
          description={[
            'Para prosseguir para o Boletim Especial, por favor selecione um ativo.',
          ]}
          buttons={[{ text: 'Prosseguir', isGreen: true, onClick: handleOk }]}
        />
      </Modal>
      <Modal
        isOpen={isInformativeModalOpen}
        contentLabel="Selecione Ativo"
        style={{
          content: {
            height: '25rem',
            width: '60rem',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
          },
        }}>
        <PopupModal
          description={[
            'Agora escolha um ponto de referência deste ativo no mapa, para acessar a previsão meteorológica para até sete dias á frente.',
          ]}
          buttons={[
            {
              text: 'Ok',
              isGreen: true,
              onClick: () => setIsInformativeModalOpen(false),
            },
          ]}
        />
      </Modal>
      <S.ContainerGlobal>
        {!isModalOpen && !isModalCoordOpen && !isInformativeModalOpen && (
          <S.Container>
            <S.ContainerActives>
              <BoletimActivesAffectedsList
                actives={listActives}
                handleSetActiveData={handleSetActiveData}
              />
            </S.ContainerActives>
            <S.ContainerMap>
              <S.MapWrapper>
                <Map geom={[]}>
                  <GeoJsonMap
                    onClickEvent={() =>
                      !selectedActive && setIsModalCoordOpen(true)
                    }
                    listaGeoJsonData={listaGeoJsonData || []}
                    maxZoom={mapZoom}
                    onLatLongSelected={handleLatLongSelection}
                    hasPin={true}
                    activeSelected={selectedActive}
                    isFilteredList={isFilteredList}
                  />
                </Map>
              </S.MapWrapper>

              <S.ButtonContainer>
                <S.Button
                  enabled={true}
                  isGreen={false}
                  onClick={handleGoHomeClick}>
                  Voltar para home
                </S.Button>
                <S.Button
                  enabled={selectedActive && selectedLatLong ? true : false}
                  isGreen={true}
                  onClick={handleSpecialBoletimClick}>
                  Ir para Boletim Especial
                </S.Button>
              </S.ButtonContainer>
            </S.ContainerMap>
          </S.Container>
        )}
      </S.ContainerGlobal>
    </>
  );
};

export default BoletimMap;
