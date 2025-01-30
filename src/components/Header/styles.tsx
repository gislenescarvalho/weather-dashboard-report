import styled from 'styled-components';

interface DropdownContentProps {
  isVisible: boolean;
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: fixed; /* Fixa o header */
  top: 0; /* Fixa no topo */
  left: 0;
  width: 100%; /* Ocupa toda a largura da página */
  background-color: var(--color-neutral-white); /* Cor de fundo */
  z-index: 9999; /* Garante que o header fique acima de outros elementos */
  padding: 1.1rem 0;
  border-bottom: 0.063rem solid var(--color-gray-600);
  font-family: 'Prompt', sans-serif;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  margin-left: 4.375rem;
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--color-gray-800);
  background-color: transparent;
  border: none;
  cursor: pointer;
  line-height: 2rem;
  letter-spacing: 0.02rem;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &:hover {
    color: var(--color-primary-blue);
    font-weight: 700;
    transform: scale(1.05);
  }
`;

const DropdownContent = styled.div<DropdownContentProps>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background-color: white;
  width: 15rem;
  border: 0.063rem solid var(--color-primary-blue);
  z-index: 1;
  margin-right: 3.5rem;
  margin-top: 1rem;
  z-index: 9999;

  hr {
    border-top: 0.063rem solid var(--color-primary-blue);
  }
`;

const DropdownLink = styled.a`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary-blue);
  background-color: transparent;
  border: none;
  letter-spacing: 0.02rem;
  text-align: center;
  padding: 0.8rem 2rem;
  text-decoration: none !important;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  display: block;
  cursor: pointer;

  a {
    text-decoration: none !important;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const DropdownContainer = styled.div`
  margin-right: 4.375rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  font-family: 'Prompt', sans-serif;
  padding-left: 2rem;
`;

const SubtitleText = styled.span`
  color: var(--color-gray-700);
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

const TitleText = styled.h1`
  color: var(--color-primary-blue);
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
`;

export {
  Dropdown,
  DropdownButton,
  DropdownContainer,
  DropdownContent,
  DropdownLink,
  HeaderWrapper,
  Logo,
  LogoImage,
  SubtitleText,
  TitleContainer,
  TitleText,
};
