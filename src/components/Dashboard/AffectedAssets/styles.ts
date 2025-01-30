import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  text-align: center;

  span {
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.2rem;
  }
`;

export const BodyContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding-top: 2.7rem;
    padding-bottom: 2.7rem;
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 2.2rem;
  }
`;

export const AssetCardContainerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const AssetCardStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.35rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.375rem;
  border: 0.03125rem solid var(--color-gray-600);
`;

export const AssetCardHeaderTitleStyle = styled.h3`
  text-align: center;
  font-size: 0.625rem;
  line-height: 0.75rem;
  margin: 0;
`;

export const InfoSymbol = styled.span`
  display: inline-block;
  text-align: center;
  font-family: 'Prompt', sans-serif;
  width: 0.625rem;
  height: 0.625rem;
  background-color: var(--color-primary-blue);
  color: white;
  border-radius: 50%;
  line-height: 0.65rem;
  font-size: 0.5rem;
  padding-top: 0.025rem;
  margin-left: 0.2rem;
`;

export const AssetCardBodyStyle = styled.div`
  display: flex;
  font-family: 'Prompt', sans-serif;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  line-height: 1.7rem;
`;

export const AssetCardFooterStyle = styled.span`
  font-size: 0.5rem;
`;
