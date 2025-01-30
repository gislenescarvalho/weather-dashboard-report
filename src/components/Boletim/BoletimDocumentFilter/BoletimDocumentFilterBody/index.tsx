import BoletimDocumentWeatherVariationFilter from '../BoletimDocumentWeatherVariationFilter';
import * as S from './styles';

export const BoletimDocumentFilterBody = () => {
  return (
    <S.Container>
      <S.ContainerFilters>
        <BoletimDocumentWeatherVariationFilter />
      </S.ContainerFilters>
      <S.Button primary>Gerar Boletim Especial</S.Button>
    </S.Container>
  );
};
