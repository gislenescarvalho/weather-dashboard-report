import Image from 'next/image';
import React, { useState } from 'react';
import { Substation } from 'src/models/boletim/daily-report';
import { formatValues } from 'src/utils/daily-report';

import * as S from './styles';

const {
  BodyCell,
  Container,
  HeaderCell,
  HeaderRow,
  IconCell,
  IconEventContainer,
  IconWrapper,
  LegendContainer,
  LegendItem,
  LegendText,
  LegendWrapper,
  MobileSortWrapper,
  SortIndicator,
  StyledBody,
  StyledHead,
  StyledTable,
  SubHeaderCell,
  SubHeaderRow,
  TableWrapper,
  Title,
} = S;

type SubstationProps = {
  dataTable: any;
};

/**
 * Componente que renderiza a tabela de subestações para o relatório diário de
 * boletim metereológico.
 *
 * @param {Substation[]} dataTable - Dados da tabela de subestações.
 * @returns {React.ReactElement} - Elemento React que renderiza a tabela.
 */
const SubstationTable = ({ dataTable }: SubstationProps) => {
  const tableValues: Substation[] =
    dataTable?.map(
      (item: {
        eventoLista: any;
        mean_val_precipitacao_acum_01_d: any;
        max_val_precipitacao_acum_01_di: any;
        mean_val_precipitacao_acum_07_d: any;
        max_val_precipitacao_acum_07_di: any;
        mean_val_precipitacao_acum_30_d: any;
        max_val_precipitacao_acum_30_di: any;
        ativo: {
          identificador: any;
          empresa: { nome: any };
        };
      }) => ({
        responsavel: item.ativo.empresa.nome,
        substacao: item.ativo.identificador,
        evento: item.eventoLista,
        ontem: formatValues(
          item.mean_val_precipitacao_acum_01_d,
          item.max_val_precipitacao_acum_01_di,
        ),
        ultimos7dias: formatValues(
          item.mean_val_precipitacao_acum_07_d,
          item.max_val_precipitacao_acum_07_di,
        ),
        ultimos30dias: formatValues(
          item.mean_val_precipitacao_acum_30_d,
          item.max_val_precipitacao_acum_30_di,
        ),
      }),
    ) ?? [];

  const [tableData, setTableData] = useState(tableValues);
  const [sortConfig, setSortConfig] = useState({
    key: 'ativo',
    direction: 'asc',
  });

  const [mobileSortColumn, setMobileSortColumn] = useState('');
  const [mobileSortDirection, setMobileSortDirection] = useState<string | null>(
    null,
  );

  const onSort = (columnKey: string, forcedDirection = 'asc') => {
    let direction = forcedDirection || 'asc';

    if (!forcedDirection) {
      if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
    }

    const sorted = [...tableData].sort((a, b) => {
      if (
        columnKey === 'ontem' ||
        columnKey === 'ultimos7dias' ||
        columnKey === 'ultimos30dias'
      ) {
        const aVal = parseFloat(a[columnKey].split('|')[0]) || 0;
        const bVal = parseFloat(b[columnKey].split('|')[0]) || 0;
        return aVal > bVal ? 1 : -1;
      } else {
        return a[columnKey].localeCompare(b[columnKey]);
      }
    });

    if (direction === 'desc') {
      sorted.reverse();
    }

    setTableData(sorted);
    setSortConfig({ key: columnKey, direction });
  };

  const getSortIndicator = (columnKey: string | null) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? (
        <Image
          src={`/icons/boletim/legend/ArrowUp.svg`}
          width={15}
          height={15}
        />
      ) : (
        <Image
          src={`/icons/boletim/legend/ArrowDow.svg`}
          width={15}
          height={15}
        />
      );
    }
    return '';
  };

  const renderEventoIcon = (evento: any) => {
    console.log(evento);
    return evento && evento.length == 1 ? (
      <Image
        src={`/icons/boletim/legend/${evento[0]}.svg`}
        width={15}
        height={15}
      />
    ) : evento.length > 1 ? (
      <IconEventContainer>
        {evento.map((item: string, index: number) => (
          <Image
            key={index}
            src={`/icons/boletim/legend/${item}.svg`}
            width={15}
            height={15}
          />
        ))}
      </IconEventContainer>
    ) : (
      '-'
    );
  };

  const renderTitleAndLegend = (title: string) => (
    <LegendContainer>
      <Title>{title}</Title>
      <LegendWrapper>
        <LegendItem>
          <IconWrapper>
            <Image
              src={`/icons/boletim/legend/VentoSevero.svg`}
              width={15}
              height={15}
            />
          </IconWrapper>
          <LegendText>Vento Severo (&gt;50km/h)</LegendText>
        </LegendItem>
        <LegendItem>
          <IconWrapper>
            <Image
              src={`/icons/boletim/legend/ChuvaSevera.svg`}
              width={15}
              height={15}
            />
          </IconWrapper>
          <LegendText>Chuva Severa (&gt;60mm/dia)</LegendText>
        </LegendItem>
        <LegendItem>
          <IconWrapper>
            <Image
              src={`/icons/boletim/legend/TemperaturaSevera.svg`}
              width={15}
              height={15}
            />
          </IconWrapper>
          <LegendText>Temperatura Severa (&gt;40°C)</LegendText>
        </LegendItem>
      </LegendWrapper>
    </LegendContainer>
  );

  const handleMobileSortChange = (e: { target: { value: any } }) => {
    const column = e.target.value;
    setMobileSortColumn(column);
    if (column && mobileSortDirection) {
      onSort(column, mobileSortDirection);
    }
  };

  const handleMobileDirectionChange = (e: { target: { value: any } }) => {
    const direction = e.target.value;
    setMobileSortDirection(direction);
    if (mobileSortColumn && direction) {
      onSort(mobileSortColumn, direction);
    }
  };

  return (
    <Container>
      {tableValues && tableValues.length > 0 ? (
        <>
          {tableValues.length > 1
            ? renderTitleAndLegend('Subestações')
            : renderTitleAndLegend('Subestação')}
          <MobileSortWrapper>
            <label htmlFor="sort-column">Ordenar por coluna:</label>
            <select
              id="sort-column"
              value={mobileSortColumn}
              onChange={handleMobileSortChange}>
              <option value="">---</option>
              <option value="responsavel">Responsável Pelo Ativo</option>
              <option value="subestacao">Ativo: Subestação</option>
              <option value="evento">Evento Metereológico</option>
              <option value="ontem">Precipitação acumulada - Ontem</option>
              <option value="ultimos7dias">
                Precipitação acumulada - Últimos 7 dias
              </option>
              <option value="ultimos30dias">
                Precipitação acumulada - Últimos 30 dias
              </option>
            </select>

            <label htmlFor="sort-direction">Direção:</label>
            <select
              id="sort-direction"
              value={mobileSortDirection ?? 'asc'}
              onChange={handleMobileDirectionChange}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </MobileSortWrapper>

          <TableWrapper>
            <StyledTable>
              <StyledHead>
                <HeaderRow>
                  <HeaderCell rowSpan={2} onClick={() => onSort('responsavel')}>
                    Responsável Pelo Ativo
                    <SortIndicator>
                      {getSortIndicator('responsavel')}
                    </SortIndicator>
                  </HeaderCell>
                  <HeaderCell colSpan={1}>Ativo</HeaderCell>
                  <HeaderCell rowSpan={2} onClick={() => onSort('evento')}>
                    Evento Metereológico
                    <SortIndicator>{getSortIndicator('evento')}</SortIndicator>
                  </HeaderCell>
                  <HeaderCell colSpan={3}>
                    Precipitação acumulada (mm) na região em atenção (média |
                    máxima)
                  </HeaderCell>
                </HeaderRow>
                <SubHeaderRow>
                  <SubHeaderCell onClick={() => onSort('subestacao')}>
                    Subestação
                    <SortIndicator>
                      {getSortIndicator('subestacao')}
                    </SortIndicator>
                  </SubHeaderCell>
                  <SubHeaderCell onClick={() => onSort('ontem')}>
                    Ontem (mm)
                    <SortIndicator>{getSortIndicator('ontem')}</SortIndicator>
                  </SubHeaderCell>
                  <SubHeaderCell onClick={() => onSort('ultimos7dias')}>
                    Últimos 7 dias (mm)
                    <SortIndicator>
                      {getSortIndicator('ultimos7dias')}
                    </SortIndicator>
                  </SubHeaderCell>
                  <SubHeaderCell onClick={() => onSort('ultimos30dias')}>
                    Últimos 30 dias (mm)
                    <SortIndicator>
                      {getSortIndicator('ultimos30dias')}
                    </SortIndicator>
                  </SubHeaderCell>
                </SubHeaderRow>
              </StyledHead>
              <StyledBody>
                {tableValues.map((item, index) => (
                  <tr key={index}>
                    <BodyCell data-label="Responsável Pelo Ativo:">
                      {item?.responsavel}
                    </BodyCell>
                    <BodyCell data-label="Ativo - Subestação:">
                      {item?.subestacao}
                    </BodyCell>
                    <IconCell data-label="Evento Metereológico:">
                      {renderEventoIcon(item?.evento)}
                    </IconCell>
                    <BodyCell data-label="Ontem (mm):">{item?.ontem}</BodyCell>
                    <BodyCell data-label="Últimos 7 dias (mm):">
                      {item?.ultimos7dias}
                    </BodyCell>
                    <BodyCell data-label="Últimos 30 dias (mm):">
                      {item?.ultimos30dias}
                    </BodyCell>
                  </tr>
                ))}
              </StyledBody>
            </StyledTable>
          </TableWrapper>
        </>
      ) : (
        <p>Subestação: Nenhuma exposta à condição meteorológica severa.</p>
      )}
    </Container>
  );
};

export default SubstationTable;
