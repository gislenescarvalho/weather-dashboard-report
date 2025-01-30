import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

// Wrapper principal para a área cinza
export const Wrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Prompt', sans-serif;
  background-color: #f5f5f5; /* Cor de fundo cinza */
  flex-direction: column;
  padding: 1rem 2rem; /* Espaçamento interno */
`;

// Container para os botões
export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 1rem; /* Espaçamento entre os botões */
`;

// Botão primário (verde)
export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => {
    return primary ? '#00a61c;' : '#0070a8;';
  }};
  height: 35px;
  color: #fff;
  border: none;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  font-size: 1.4rem;
  font-family: 'Prompt', sans-serif;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: ${({ primary }) => {
      return primary ? '#218838;' : '#0056b3;';
    }};
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const TitleDescription = styled.h1`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Prompt', sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 38.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #303036;
`;

export const TitleLogo = styled.div`
  justify-content: left;
  align-items: left;
`;

export const Content = styled.div`
  padding-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  background-color: #fff;
`;

export const Description = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  margin-top: 5rem;

  h1 {
    font-family: 'Prompt', sans-serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.02rem;
    color: #303036;
  }
  h2 {
    font-family: 'Prompt', sans-serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.02rem;
    color: #303036;
  }

  span {
    font-family: 'Prompt', sans-serif;
    font-size: 16px;
    font-weight: 600;

    strong {
      font-family: 'Prompt', sans-serif;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .observations {
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    span {
      font-family: 'Prompt', sans-serif;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const TableDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
  h1 {
    font-family: 'Prompt', sans-serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.02rem;
    color: #303036;
  }
  h2 {
    font-family: 'Prompt', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #303036;
  }

  span {
    font-family: 'Prompt', sans-serif;
    font-size: 16px;
    font-weight: 600;

    strong {
      font-family: 'Prompt', sans-serif;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .observations {
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    span {
      font-family: 'Prompt', sans-serif;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const PageSection = styled.div.attrs<{ isFooter?: boolean }>(() => ({
  'data-page-section': true, // Atributo customizado para identificação
}))<{ isFooter?: boolean }>`
  page-break-inside: avoid; /* Evita quebra de página no meio */
  width: 100%; /* Ocupa toda a largura */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Só aplica padding se não for footer */
  padding-left: ${({ isFooter: isFooter }) => (isFooter ? '0' : '7rem')};
  padding-right: ${({ isFooter: isFooter }) => (isFooter ? '0' : '7rem')};

  h2,
  h3 {
    width: 100%;
    text-align: left;
    padding: 1rem 0;
  }
`;

export const EmissionDate = styled.h2`
  width: 100%;
  text-align: left;
  padding: 2rem 0;
  font-family: 'Prompt', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #637883;
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

export const DescriptionTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Prompt', sans-serif;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
`;

export const DescriptionText = styled.span`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #303036;
  gap: 1rem;
  flex-wrap: nowrap;
  min-width: 23rem;
  letter-spacing: 0.02rem;
`;

export const DescriptionContactsText = styled.span`
  margin-top: 1rem;
  font-family: 'Prompt', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #637883;
  letter-spacing: 0.02rem;
`;

export const TableDescriptionAlert = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-family: 'Prompt', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: var(--color-base-black);
  line-height: 1.5rem;
  margin-top: 1rem;
  letter-spacing: 0.02rem;

  strong {
    font-weight: 600;
  }
`;

export const ItemLegends = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
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

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const DailyReportTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.5rem;
`;
