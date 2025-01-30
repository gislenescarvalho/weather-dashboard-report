import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100vh;
    font-family: 'Prompt', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--color-gray-800);
  }
`;

export const MenuContainer = styled.div`
  position: fixed; /* Fixa o header */
  height: 10rem;
  width: 100%; /* Ocupa toda a largura da página */
  padding-top: 6rem;
  background-color: var(--color-neutral-white); /* Cor de fundo */
  z-index: 999; /* Garante que o header fique acima de outros elementos */
  backgound-color: var(--color-neutral-white);
`;
