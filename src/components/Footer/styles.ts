import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 12rem;
  background-color: #0070a8;
  justify-content: space-around;
  padding: 2rem;
  padding-left: 4rem;
  padding-right: 4rem;
  font-family: 'Prompt', sans-serif;
  bottom: 0;
  z-index: 9999;
`;

export const FooterDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 100%;
  color: #fafafa;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 2rem;
  text-decoration-skip-ink: none;

  .version {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1rem;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`;
