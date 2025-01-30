import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import * as S from './styles';

/**
 * Componente que renderiza o header da aplicação.
 *
 * Dependendo da rota atual, ele renderiza um título e um subtítulo
 * diferentes. Também renderiza um dropdown com links para as páginas
 * de boletim especial e dashboard.
 *
 * @returns JSX.Element
 */
const HeaderHome = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const getHeaderTitle = () => {
    switch (router.pathname) {
      case '/':
        return null;
      case '/dashboard':
        return {
          title:
            'Boletim Informativo - Informações de Ativos sob condição meteorológica',
          subtitle: '(Vento, Temperatura e Chuva)',
        };
      case '/boletim-map':
        return {
          title: 'Boletim Meteorológico Especial',
          subtitle: 'Selecione um local no território nacional',
        };
      case '/special-report':
        return {
          title: 'Boletim Meteorológico Especial',
          subtitle: '',
        };
      case '/daily-report':
        return {
          title: 'Boletim Meteorológico Diário',
          subtitle: '',
        };
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <S.HeaderWrapper>
      <S.Logo>
        <a href="/">
          <S.LogoImage src="/icons/logo/AtmosLogo.svg" alt="Eletrobras Logo" />
        </a>
      </S.Logo>
      {getHeaderTitle() && (
        <S.TitleContainer>
          <S.TitleText>{get(getHeaderTitle(), 'title')}</S.TitleText>
          <S.SubtitleText>{get(getHeaderTitle(), 'subtitle')}</S.SubtitleText>
        </S.TitleContainer>
      )}
      <S.DropdownContainer ref={dropdownContainerRef}>
        <S.DropdownButton onMouseEnter={handleMouseEnter}>
          FERRAMENTAS
        </S.DropdownButton>
        <S.DropdownContent
          isVisible={isDropdownVisible}
          onMouseLeave={handleMouseLeave}>
          <S.DropdownLink href={'/dashboard'}>Dashboard</S.DropdownLink>
          <hr />
          <S.DropdownLink href={'/boletim-map'}>
            Boletim Especial
          </S.DropdownLink>
          <hr />
          <S.DropdownLink href={'https://smac.climatempo.io/'}>
            SMAC
          </S.DropdownLink>
          <hr />
          <S.DropdownLink href={'daily-report'}>Boletim Diário</S.DropdownLink>
        </S.DropdownContent>
      </S.DropdownContainer>
    </S.HeaderWrapper>
  );
};

export default HeaderHome;
