import Image from 'next/image';
import React, { useState } from 'react';

import { Card, CardContainer, Icon, Label, Title } from './styles';

const BoletimDocumentWeatherVariationFilter: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleCardClick = (label: string) => {
    setSelectedCards(prevSelected =>
      prevSelected.includes(label)
        ? prevSelected.filter(item => item !== label)
        : [...prevSelected, label],
    );
  };

  const weatherOptions = [
    {
      label: 'Precipitação',
      icon: {
        src: '/icons/boletim/Chuva.svg',
        srcSelected: '/icons/boletim/ChuvaWhite.svg',
        alt: 'Precipitação',
      },
    },
    {
      label: 'Umidade Relativa do Ar',
      icon: {
        src: '/icons/boletim/Humidity.svg',
        srcSelected: '/icons/boletim/HumidityWhite.svg',
        alt: 'Umidade Relativa do Ar',
      },
    },
    {
      label: 'Temperatura do Ar',
      icon: {
        src: '/icons/boletim/Temperatura.svg',
        srcSelected: '/icons/boletim/TemperaturaWhite.svg',
        alt: 'Temperatura do Ar',
      },
    },
    {
      label: 'Intensidade do Vento',
      icon: {
        src: '/icons/boletim/Vento.svg',
        srcSelected: '/icons/boletim/VentoWhite.svg',
        alt: 'Intensidade do Vento',
      },
    },
  ];

  return (
    <>
      <Title>
        Selecione as variações meteorológicas que constarão no boletim:
      </Title>
      <CardContainer>
        {weatherOptions.map(option => (
          <Card
            key={option.label}
            selected={selectedCards.includes(option.label)}
            onClick={() => handleCardClick(option.label)}>
            <Icon>
              <Image
                src={
                  selectedCards.includes(option.label)
                    ? option.icon.srcSelected
                    : option.icon.src
                }
                width={36}
                height={36}
                alt={option.icon.alt}
              />
            </Icon>
            <Label selected={selectedCards.includes(option.label)}>
              {option.label}
            </Label>
          </Card>
        ))}
      </CardContainer>
    </>
  );
};

export default BoletimDocumentWeatherVariationFilter;
