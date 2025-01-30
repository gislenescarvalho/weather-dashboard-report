import { Card } from 'components/Card';
import { isEmpty } from 'lodash';
import React from 'react';
import { ConditionModel } from 'src/models/condition';

import * as S from './styles';

type ActiveSelectedProps = {
  active?: ConditionModel;
};

const ActiveSelected = ({ active }: ActiveSelectedProps) => {
  if (isEmpty(active))
    return (
      <Card.Wrapper>
        <Card.Header>
          <span>Informações do ativo selecionado</span>
        </Card.Header>
      </Card.Wrapper>
    );

  return (
    <Card.Wrapper>
      <Card.Header>
        <span>Informações do ativo selecionado</span>
      </Card.Header>
      <Card.Body>
        <S.ActiveTableWrapper>
          <S.ActiveDataRow>
            <span>{active.empresa.nome}</span>
            <span>{active.classeTensao.identificador}kv</span>
            <span>{active.ativo.identificador}</span>
          </S.ActiveDataRow>
          <S.Row>
            <div className="classification">Classificação</div>
          </S.Row>
          <S.Row>
            <div className="condition">{active.condicaoMeteorologica.nome}</div>
          </S.Row>
          <S.Row>
            <div className="events">Eventos Meteorológicos</div>
          </S.Row>
          <S.Row>
            <div className="weather">
              <span>{active.eventoMeteorologico}</span>
            </div>
          </S.Row>
          <S.Row>
            <div className="affected">Extensão Afetada</div>
          </S.Row>
          <S.Row>
            <div className="basic">
              <span>
                {Number(active.extensaoAfetada).toFixed(2)}km de{' '}
                {Number(active.extensaoTotalAfetada).toFixed(2)}km
              </span>
            </div>
          </S.Row>
        </S.ActiveTableWrapper>
      </Card.Body>
      <Card.Footer>
        <span>Última atualização: há 2 minutos</span>
      </Card.Footer>
    </Card.Wrapper>
  );
};

export default ActiveSelected;
