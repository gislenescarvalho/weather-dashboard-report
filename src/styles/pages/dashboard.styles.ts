import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 91rem;
  overflow: hidden;
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.6rem;
  margin-top: 7rem;
`;

export const FiltersWrapper = styled.div`
  min-width: 21rem;
  max-width: 28rem;
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
`;

export const AffectedAssetsWrapper = styled.div`
  max-width: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
`;

export const MapWrapper = styled.div`
  min-width: 45rem;
  flex: 1;
  overflow: hidden;
`;

export const PrecipitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
