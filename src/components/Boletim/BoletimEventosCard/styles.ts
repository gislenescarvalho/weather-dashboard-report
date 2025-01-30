import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 2rem;
  padding-left: 5rem;
  padding-bottom: 5rem;
`;

export const ContainerHeader = styled.div`
  margin-bottom: 3rem;
`;

export const ContainerHeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Prompt', sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #303036;
`;

export const ContainerHeaderLatLong = styled.span`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  font-family: 'Prompt', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #637883;
`;

export const ContainerHeaderTitleIcon = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`;

export const ContainerHeaderSubTitleDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

export const ContainerHeaderSubTitle = styled.span`
  font-family: 'Prompt', sans-serif;
  color: #303036;
  font-size: 28px;
  font-weight: 700;
  line-height: 33.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const ContainerHeaderSubTitleUpdatedDate = styled.span`
  font-family: 'Prompt', sans-serif;
  color: #637883;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const ContainerBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 1.2rem;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
`;

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  color: #303036;

  span {
    font-family: 'Prompt', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
  }
`;

export const ItemBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 2rem;

  .flex-center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ItemTemparatureContent = styled.div<{
  large: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ItemImageTemperature = styled.div`
  display: flex;
`;

export const ItemBodyTemperatureSeparator = styled.span`
  display: flex;
  margin: 0 1rem;
  opacity 0.5;
  color: #abbcc4;
  font-weight: 300;
`;

export const ItemBodyTemperature = styled.div<{
  large: boolean;
}>`
  display: flex;
  flex-direction: column;
  font-family: 'Prompt', sans-serif;
  font-size: ${({ large }) => (large ? '32px' : '16px')};
  font-weight: 300;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const ItemBodyWheather = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemBodyWheatherItem = styled.div`
  display: flex;
  margin: 1rem;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  font-family: 'Prompt', sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 1.4rem;
  span {
    margin-left: 1rem;
  }
`;

export const ItemBodyWheatherHumidity = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Prompt', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const ItemLegends = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const ItemLegendsTitle = styled.div`
  font-family: 'Prompt', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const ItemLegendsIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;

  span {
    font-family: 'Prompt', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 0.5rem;
  }
`;
