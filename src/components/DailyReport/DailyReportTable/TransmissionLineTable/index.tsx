import Image from 'next/image';
import React, { useState } from 'react';
import { TransmissionLine } from 'src/models/boletim/daily-report';
import { formatCoordinates, formatValues } from 'src/utils/daily-report';

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

type TransmissionLineProps = {
  dataTable?: any;
};

/**
 * Componente que renderiza uma tabela com informações sobre linhas de transmissão que possuem trechos sob atenção.
 *
 * @returns {JSX.Element} Elemento JSX que representa a tabela.
 */

const TransmissionLineTable = ({ dataTable }: TransmissionLineProps) => {
  const tableValues: TransmissionLine[] =
    dataTable?.map(
      (item: {
        ativo: { empresa: { nome: any }; identificador: any };
        eventoLista: any;
        mean_val_precipitacao_acum_01_d: any;
        max_val_precipitacao_acum_01_di: any;
        mean_val_precipitacao_acum_07_d: any;
        max_val_precipitacao_acum_07_di: any;
        mean_val_precipitacao_acum_30_d: any;
        max_val_precipitacao_acum_30_di: any;
        extensaoTotalAfetada: any;
        extensaoAfetada: any;
        trechoAtencaoPontoInicial: any[];
        trechoAtencaoPontoFinal: any[];
      }) => ({
        responsavel: item.ativo.empresa.nome,
        linha: item.ativo.identificador,
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
        total: item.extensaoTotalAfetada.toFixed(2),
        sobAtencao: item.extensaoAfetada.toFixed(2),
        ptInicial: item.trechoAtencaoPontoInicial
          ? formatCoordinates(item.trechoAtencaoPontoInicial)
          : '-',
        ptFinal: item.trechoAtencaoPontoFinal
          ? formatCoordinates(item.trechoAtencaoPontoFinal)
          : '-',
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
      if (['total', 'sobAtencao'].includes(columnKey)) {
        return a[columnKey] - b[columnKey];
      }
      if (['ontem', 'ultimos7dias', 'ultimos30dias'].includes(columnKey)) {
        const aVal = parseFloat(a[columnKey].split('|')[0]) || 0;
        const bVal = parseFloat(b[columnKey].split('|')[0]) || 0;
        return aVal - bVal;
      }
      return a[columnKey].localeCompare(b[columnKey]);
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

  return (
    <Container>
      {tableValues.length > 1
        ? renderTitleAndLegend('LTs com maiores receitas')
        : renderTitleAndLegend('LT de maior receita')}
      <MobileSortWrapper>
        <label htmlFor="sort-column">Ordenar por coluna:</label>
        <select
          id="sort-column"
          value={mobileSortColumn}
          onChange={handleMobileSortChange}>
          <option value="">---</option>
          <option value="responsavel">Responsável Pelo Ativo</option>
          <option value="linha">Ativo: Linha de Transmissão</option>
          <option value="evento">Evento Meteorológico</option>
          <option value="ontem">Ontem</option>
          <option value="ultimos7dias">Últimos 7 dias</option>
          <option value="ultimos30dias">Últimos 30 dias</option>
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
        {tableValues && tableValues.length > 0 ? (
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
                  Evento Meteorológico
                  <SortIndicator>{getSortIndicator('evento')}</SortIndicator>
                </HeaderCell>
                <HeaderCell colSpan={2}>Extensão da LT (km)</HeaderCell>
                <HeaderCell colSpan={2}>
                  Trecho em atenção (latitude | longitude)
                </HeaderCell>
                <HeaderCell colSpan={3}>
                  Precipitação acumulada (mm) na região em atenção (média |
                  máxima)
                </HeaderCell>
              </HeaderRow>

              <SubHeaderRow>
                <SubHeaderCell onClick={() => onSort('linha')}>
                  Linha de transmissao
                  <SortIndicator>{getSortIndicator('linha')}</SortIndicator>
                </SubHeaderCell>
                <SubHeaderCell onClick={() => onSort('total')}>
                  Total
                  <SortIndicator>{getSortIndicator('total')}</SortIndicator>
                </SubHeaderCell>
                <SubHeaderCell onClick={() => onSort('sobAtencao')}>
                  Sob Atenção
                  <SortIndicator>
                    {getSortIndicator('sobAtencao')}
                  </SortIndicator>
                </SubHeaderCell>
                <SubHeaderCell>Pt.Inicial</SubHeaderCell>
                <SubHeaderCell>Pt.Final</SubHeaderCell>
                <SubHeaderCell onClick={() => onSort('ontem')}>
                  Ontem
                  <SortIndicator>{getSortIndicator('ontem')}</SortIndicator>
                </SubHeaderCell>
                <SubHeaderCell onClick={() => onSort('ultimos7dias')}>
                  Últimos 07 dias
                  <SortIndicator>
                    {getSortIndicator('ultimos7dias')}
                  </SortIndicator>
                </SubHeaderCell>
                <SubHeaderCell onClick={() => onSort('ultimos30dias')}>
                  Últimos 30 dias
                  <SortIndicator>
                    {getSortIndicator('ultimos30dias')}
                  </SortIndicator>
                </SubHeaderCell>
              </SubHeaderRow>
            </StyledHead>

            <StyledBody>
              {tableData.map((item, idx) => (
                <tr key={idx}>
                  <BodyCell data-label="Responsável Pelo Ativo:">
                    {item?.responsavel}
                  </BodyCell>
                  <BodyCell data-label="Ativo - Linha de transmissão:">
                    {item?.linha}
                  </BodyCell>
                  <IconCell data-label="Meteorológico:">
                    {renderEventoIcon(item?.evento)}
                  </IconCell>
                  <BodyCell data-label="Total:">{item?.total}</BodyCell>
                  <BodyCell data-label="Sob Atenção:">
                    {item?.sobAtencao}
                  </BodyCell>
                  <BodyCell data-label="Pt.Inicial:">
                    {item?.ptInicial}
                  </BodyCell>
                  <BodyCell data-label="Pt.Final:">{item?.ptFinal}</BodyCell>
                  <BodyCell data-label="Ontem:">{item?.ontem}</BodyCell>
                  <BodyCell data-label="Últimos 07 dias:">
                    {item?.ultimos7dias}
                  </BodyCell>
                  <BodyCell data-label="Últimos 30 dias:">
                    {item?.ultimos30dias}
                  </BodyCell>
                </tr>
              ))}
            </StyledBody>
          </StyledTable>
        ) : (
          <p>
            LTs de maior receita: Nenhuma exposta à condição meteorológica
            severa.
          </p>
        )}
      </TableWrapper>
    </Container>
  );
};

export default TransmissionLineTable;
