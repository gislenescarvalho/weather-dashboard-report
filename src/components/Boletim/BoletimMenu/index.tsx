import React, { useState } from 'react';

import * as S from './styles';

interface IProps {
  onMenuClick: (item: string) => void;
}

const BoletimMenu = ({ onMenuClick }: IProps) => {
  // Lista mockada
  const menuItems = ['Visão Geral', 'Gerar Documento'];
  const [activeTab, setActiveTab] = useState('Visão Geral'); // Estado para o item ativo

  const handleMenuClick = (item: string) => {
    setActiveTab(item);
    onMenuClick(item);
  };

  return (
    <S.MenuContainer>
      {menuItems.map(item => (
        <S.MenuItem
          key={item}
          active={activeTab == item}
          onClick={() => handleMenuClick(item)}>
          {item}
        </S.MenuItem>
      ))}
    </S.MenuContainer>
  );
};

export default BoletimMenu;
