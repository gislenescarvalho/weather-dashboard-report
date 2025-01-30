/* eslint-disable @typescript-eslint/no-explicit-any */
const GeoJsonMap = dynamic(
  () => import('../components/Boletim/BoletimMap/GeoJsonMap'),
  { ssr: false },
);
const TransmissionLinesComponent = dynamic(
  () => import('../components/Dashboard/TransmissionLines'),
  { ssr: false },
);
const EventsConditionsPinsComponent = dynamic(
  () => import('../components/Dashboard/EventsConditionsPins'),
  { ssr: false },
);
const GeneralPrevisionAreasComponent = dynamic(
  () => import('../components/Dashboard/GeneralPrevisionAreas'),
  { ssr: false },
);
const AffectedAreasComponent = dynamic(
  () => import('../components/Dashboard/AffectedAreas'),
  { ssr: false },
);
import ActivesAffectedsList from 'components/Dashboard/ActivesAffectedsList';
import AffectedAssets from 'components/Dashboard/AffectedAssets';
import Filters from 'components/Dashboard/Filters';
import ActiveSelected from 'components/Dashboard/PrecipitationData/ActiveSelected';
import PrecipitationRegistry from 'components/Dashboard/PrecipitationData/PrecipitationRegistry';
import { UpdatedTime } from 'components/Dashboard/UpdatedTime';
import Map from 'components/Map';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { ActivesModel } from 'src/models/atives';
import { ConditionType } from 'src/models/condition-type';
import { EnterprisesModel } from 'src/models/enterprises';
import { TensionClassModel } from 'src/models/tension-class';
import { getBoletimActives } from 'src/service/boletim';
import {
  getAvailableActiveType,
  getAvailableDates,
  getAvailableEnterprises,
  getConditions,
  getEventPoints,
  getPrevisionGeneralDataRequest,
  getTensionClass,
} from 'src/service/dashboard';
import * as S from 'styles/pages/dashboard.styles';
import useSWR from 'swr';

type AdvancedFilters = {
  conditionType: number[];
  date: number[];
  enterprise: number[];
  activeType: number[];
  tensionClass: number[];
};

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedActive, setSelectedActive] = useState(undefined);
  const [selectedPrecipitation, setSelectedPrecipitation] = useState(undefined);
  const [selectedAffectedGeom, setSelectedAffectedGeom] =
    useState<any>(undefined);

  const { data: conditionsTypes, isLoading: isLoadingConditions } = useSWR(
    ['conditions-types-dashboard'],
    () => getConditions(),
  );

  const { data: availablesDate, isLoading: isLoadingAvailablesDate } = useSWR(
    ['available-dates-dashboard'],
    () => getAvailableDates(),
  );

  const {
    data: availableEnterprises,
    isLoading: isLoadingAvailableEnterprises,
  } = useSWR(['available-enterprises-dashboard'], () =>
    getAvailableEnterprises(),
  );

  const { data: availableActiveType, isLoading: isLoadingAvailableActiveType } =
    useSWR(['available-active-type-dashboard'], () => getAvailableActiveType());

  const {
    data: availableTensionClass,
    isLoading: isLoadingAvailableTensionClass,
  } = useSWR(['available-tension-class-dashboard'], () => getTensionClass());

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    date: [availablesDate?.[0].id as number],
    activeType: [0],
    conditionType: [0],
    enterprise: [0],
    tensionClass: [0],
  });

  const [useZoomBrazil, setUseZoomBrazil] = useState<boolean>(true);

  const { data: activesBoletim, isLoading: isLoadingAcitvesBoletim } = useSWR(
    [
      'boletim-actives-dashboard',
      advancedFilters.enterprise,
      advancedFilters.activeType,
      advancedFilters.tensionClass,
    ],
    () =>
      getBoletimActives({
        params: {
          empresaidlista: advancedFilters?.enterprise.filter(id => id !== 0),
          tipoativoidlistalista: advancedFilters?.activeType.filter(
            id => id !== 0,
          ),
          classetensaoidlista: advancedFilters.tensionClass.filter(
            id => id !== 0,
          ),
        },
      }),
  );

  const selectedDate = useMemo(() => {
    const date = availablesDate?.find(
      date => advancedFilters.date[0] === date.id,
    );
    return {
      ...date,
      raw: date?.raw.split('T')[0],
      timezone: date?.raw,
    };
  }, [advancedFilters.date, availablesDate]);

  const { data: eventPoints, isLoading: isLoadingEventPoints } = useSWR(
    ['event-points-dashboard', selectedDate],
    () =>
      selectedDate.raw ? getEventPoints(selectedDate?.raw as string) : null,
  );

  const { data: generalPrevision, isLoading: isLoadingGeneralPrevision } =
    useSWR(
      [
        'general-prevision-dashboard',
        selectedDate,
        advancedFilters.conditionType,
      ],
      () =>
        selectedDate.raw
          ? getPrevisionGeneralDataRequest(selectedDate?.raw as string)
          : null,
    );

  const getGeneralPrevisionByCondition = useMemo(() => {
    if (!isLoadingGeneralPrevision && generalPrevision) {
      const selectedCondition = advancedFilters.conditionType[0];

      if (generalPrevision?.length === 0 || selectedCondition === 0) {
        return generalPrevision;
      }

      const condition = conditionsTypes?.find(
        item => item.id === selectedCondition,
      );

      if (!condition) return generalPrevision;

      return (
        generalPrevision.filter(
          (item: any) => item.condicaoMeteorologica === condition.nome,
        ) ?? []
      );
    }
    return {};
  }, [
    generalPrevision,
    advancedFilters,
    conditionsTypes,
    isLoadingGeneralPrevision,
  ]);

  const generalPrevisaoGeoJSON = useMemo(() => {
    if (!isEmpty(getGeneralPrevisionByCondition)) {
      const conditionsAreas: any[] = getGeneralPrevisionByCondition.map(
        (item: any) => ({
          coordenadas: item.coordenadaLista.map((coord: any) => [
            parseFloat(coord.latitude),
            parseFloat(coord.longitude),
          ]),
          bgColor:
            item.condicaoMeteorologica === 'Condição Moderada'
              ? '#ffeaa4'
              : '#FFB560',
        }),
      );

      const cordsToGeoJson = conditionsAreas.map(area => ({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [area.coordenadas],
        },
        customStyle: {
          bgColor: area.bgColor,
        },
      }));

      setUseZoomBrazil(true);
      return cordsToGeoJson;
    }
    return {};
  }, [getGeneralPrevisionByCondition]);

  const transmissionLines = useMemo(() => {
    if (!activesBoletim && isEmpty(activesBoletim)) {
      return [];
    }

    const listaGeoJsonData: any[] =
      activesBoletim?.map((data: any) => ({
        type: 'Feature',
        geometry: {
          type:
            data.tipoAtivo.identificador === 'LT'
              ? 'MultiLineString'
              : 'Polygon',
          coordinates: JSON.parse(data.coordenadasStringLista),
        },
      })) ?? [];

    return listaGeoJsonData;
  }, [activesBoletim]);

  const handleSelectCondition = (data: number[]) => {
    setAdvancedFilters(st => ({
      ...st,
      conditionType: data,
    }));
  };

  const handleSelectAvailableDate = (data: number[]) => {
    setAdvancedFilters(st => ({
      ...st,
      date: data,
    }));
  };

  const handleSelectAvailableEnterprise = (data: number[]) => {
    setAdvancedFilters(st => ({
      ...st,
      enterprise: data,
    }));
  };

  const handleSelectAvailableActiveType = (data: number[]) => {
    setAdvancedFilters(st => ({
      ...st,
      activeType: data,
    }));
  };

  const handleSelectAvailableTensionClass = (data: number[]) => {
    setAdvancedFilters(st => ({
      ...st,
      tensionClass: data,
    }));
  };

  const handleSelectActiveFromlist = (geom: any[]) => {
    const format = geom.map(point => [
      parseFloat(point.latitude),
      parseFloat(point.longitude),
    ]);

    const geoJson = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [format],
      },
      customStyle: {
        bgColor: '#9159c1',
      },
      lastActive: true,
    };

    setSelectedAffectedGeom([geoJson]);
  };

  const handleSetPrecipitationData = (precipitation: any) => {
    setSelectedPrecipitation(precipitation);
  };

  const handleSetActiveSelected = (active: any) => {
    setSelectedActive(active);
  };

  if (!isAuthenticated) return null;

  return (
    <S.Container>
      <S.FiltersWrapper>
        <UpdatedTime lastUpdatedDate={new Date()} isLoading={false} />
        <Filters
          title="Filtrar por Data de Previsão"
          iconLeft="/icons/CalendarIcon.svg"
          textKey="date"
          isLoading={isLoadingAvailablesDate}
          data={availablesDate}
          onSelectData={handleSelectAvailableDate}
        />
        <Filters<ConditionType>
          title="Filtrar por condição"
          iconLeft="/icons/Raios.svg"
          textKey="nome"
          isLoading={isLoadingConditions}
          data={conditionsTypes}
          onSelectData={handleSelectCondition}
        />
        <Filters<EnterprisesModel>
          title="Filtrar por empresa"
          iconLeft="/icons/WorkPlaceIcon.svg"
          textKey="nome"
          isLoading={isLoadingAvailableEnterprises}
          data={availableEnterprises}
          onSelectData={handleSelectAvailableEnterprise}
          multipleValues={true}
        />
        <Filters<ActivesModel>
          title="Filtrar por tipo de ativo"
          iconLeft="/icons/RadioAntenaIcon.svg"
          textKey="identificador"
          isLoading={isLoadingAvailableActiveType}
          data={availableActiveType}
          onSelectData={handleSelectAvailableActiveType}
          multipleValues={true}
        />
        <Filters<TensionClassModel>
          title="Filtrar por classe de tensão"
          iconLeft="/icons/VoltIcon.svg"
          textKey="identificador"
          isLoading={isLoadingAvailableTensionClass}
          data={availableTensionClass}
          onSelectData={handleSelectAvailableTensionClass}
          multipleValues={true}
        />
      </S.FiltersWrapper>
      <S.AffectedAssetsWrapper>
        <AffectedAssets
          activeTypeId={
            advancedFilters.activeType.some(item => item === 0)
              ? undefined
              : advancedFilters.activeType
          }
          enterpriseId={
            advancedFilters.enterprise.some(item => item === 0)
              ? undefined
              : advancedFilters.enterprise
          }
          previsionDate={selectedDate.raw}
          tensionClassId={
            advancedFilters.tensionClass.some(item => item === 0)
              ? undefined
              : advancedFilters.tensionClass
          }
          condicaoidlista={
            advancedFilters.conditionType.some(item => item === 0)
              ? undefined
              : advancedFilters.conditionType
          }
        />
        <ActivesAffectedsList
          activeTypeId={
            advancedFilters.activeType.some(item => item === 0)
              ? undefined
              : advancedFilters.activeType
          }
          enterpriseId={
            advancedFilters.enterprise.some(item => item === 0)
              ? undefined
              : advancedFilters.enterprise
          }
          previsionDate={selectedDate.raw}
          tensionClassId={
            advancedFilters.tensionClass.some(item => item === 0)
              ? undefined
              : advancedFilters.tensionClass
          }
          condicaoidlista={
            advancedFilters.conditionType.some(item => item === 0)
              ? undefined
              : advancedFilters.conditionType
          }
          handleSetAffectedGeometry={handleSelectActiveFromlist}
          handleSetPrecipitationData={handleSetPrecipitationData}
          handleSetActiveData={handleSetActiveSelected}
        />
      </S.AffectedAssetsWrapper>
      <S.MapWrapper>
        <Map useDefaultCoordinates={useZoomBrazil}>
          <TransmissionLinesComponent geoJson={transmissionLines} zoom={4} />
          <EventsConditionsPinsComponent geoJson={eventPoints} zoom={4} />
          <GeneralPrevisionAreasComponent geoJson={generalPrevisaoGeoJSON} />
          <AffectedAreasComponent geoJson={selectedAffectedGeom} />
        </Map>
      </S.MapWrapper>
      <S.PrecipitationWrapper>
        <ActiveSelected active={selectedActive} />
        <PrecipitationRegistry precipitation={selectedPrecipitation} />
      </S.PrecipitationWrapper>
    </S.Container>
  );
};
export default DashboardPage;
