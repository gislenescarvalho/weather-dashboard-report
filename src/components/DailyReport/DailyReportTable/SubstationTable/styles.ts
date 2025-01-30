import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  font-family: 'Prompt', sans-serif;
  padding: 2rem 0;
`;

const MobileSortWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 1rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 1rem 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  @media screen and (max-width: 768px) {
    display: block;
    thead,
    tfoot {
      display: none;
    }
    tbody {
      display: block;
      width: 100%;
    }
    tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fff;
      padding: 0.5rem;
    }
    td {
      display: block;
      border: none;
      padding: 0.5rem 0;
      text-align: right;
      position: relative;
    }
    td::before {
      content: attr(data-label);
      position: absolute;
      left: 0.5rem;
      font-weight: bold;
      text-align: left;
    }
  }
`;

const StyledHead = styled.thead`
  background-color: var(--color-primary-blue);
  color: var(--color-base-white);
`;

const HeaderRow = styled.tr``;
const SubHeaderRow = styled.tr``;
const StyledBody = styled.tbody`
  background-color: #f8f9fa;
`;

const HeaderCell = styled.th`
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ddd;
  &:hover {
    background-color: #2980b9;
  }
`;

const SubHeaderCell = styled.th`
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ddd;
  &:hover {
    background-color: #2980b9;
  }
`;

const BodyCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  &[data-label]::before {
    width: 50%;
  }
`;

const IconCell = styled.td`
  padding: 0.75rem;
  text-align: center;
  border: 1px solid #dee2e6;
  &[data-label]::before {
    width: 50%;
  }
`;

const SortIndicator = styled.span`
  margin-left: 4px;
  font-size: 0.7rem;
  display: inline-block;
`;

const Title = styled.span`
  font-size: 16px;
`;

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LegendText = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

const IconEventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export {
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
};
