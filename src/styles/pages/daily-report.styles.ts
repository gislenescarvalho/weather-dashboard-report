import styled from 'styled-components';

export const DailyReportContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10rem 3rem 3rem 4rem;
  font-family: 'Prompt', sans-serif;

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 16px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: var(--color-gray-800);
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 16px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: var(--color-base-black);
    padding-bottom: 2rem;
  }
  p {
    padding: 1rem 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: var(--color-base-black);
  }
`;
