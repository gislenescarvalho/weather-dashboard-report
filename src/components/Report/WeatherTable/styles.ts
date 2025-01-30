import styled from 'styled-components';

export const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

export const Title = styled.h2`
  text-align: center;
  background-color: var(--color-blue-800);
  color: white;
  padding: 0.5rem 0;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Prompt', sans-serif;
  line-height: 1.7;
  color: white;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
  border-top: 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  table-layout: fixed;
  color: #303036;
  th,
  td {
    border: 1px solid #8da3ae;
    padding: 12px;
    text-align: center;
    word-wrap: break-word;
  }

  th {
    background-color: #0088cc;
    color: white;
    font-size: 14px;
    padding: 2rem;
  }

  td {
    font-size: 14px;
    color: #333;
  }

  .highlight {
    font-weight: bold;
    color: red;
  }

  .precipitation {
    font-weight: bold;

    .low {
      color: #00a61c;
    }

    .moderated {
      color: #ffcd05;
    }

    .strong {
      color: #ff7903;
    }

    .toStrong {
      color: #ff0000;
    }
  }

  .temperature {
    font-weight: bold;

    .toLow {
      color: #ff0000;
    }

    .low {
      color: #ffcd05;
    }

    .normal {
      color: #00a61c;
    }

    .high {
      color: #ffcd05;
    }

    .toHigh {
      color: #ff0000;
    }
  }

  .humidity {
    font-weight: bold;

    .low {
      color: #ff0000;
    }

    .normal {
      color: #00a61c;
    }

    .moderated {
      color: #ffcd05;
    }

    .high {
      color: #ff0000;
    }
  }

  .wind {
    font-weight: bold;

    .low {
      color: #00a61c;
    }

    .moderated {
      color: #ffcd05;
    }

    .strong {
      color: #ff0000;
    }
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
`;

export const LegendColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LegendTitle = styled.div`
  font-family: 'Prompt', sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.5rem;
  color: --var(--color-gray-800);
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1.25rem;
`;

export const Legend = styled.div`
  font-family: 'Prompt', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: --var(--color-gray-800);
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0.5rem 0;
`;

export const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;
