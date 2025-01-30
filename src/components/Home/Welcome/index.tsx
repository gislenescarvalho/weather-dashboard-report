// components/Welcome.js
import { Card } from 'components/Card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import * as S from './styles';

const Welcome = () => {
  const router = useRouter();

  const handleRedirectToDashboard = () => {
    router.push('/dashboard');
  };

  const handleRedirectToDailyReport = () => {
    router.push('/daily-report');
  };

  const handleRedirectToReport = () => {
    router.push('/boletim-map');
  };

  const handleRedirectToSMAC = () => {
    window.open('https://smac.climatempo.io/', '_blank');
  };

  return (
    <Card.Wrapper>
      <Card.Header>
        <S.TitleContainer>
          <S.Title>Seja bem-vindo ao</S.Title>
          <S.BlueTitle>Portal Atmos</S.BlueTitle>
          <S.Subtitle>
            <p>
              Bem-vindo ao Portal Atmos, a plataforma de Meteorologia da
              Eletrobras.
            </p>

            <p>
              Com condições climáticas cada vez mais impactando nossas
              atividades, a antecipação de eventos meteorológicos pode fazer
              toda a diferença na segurança e performance de nossos ativos e
              operações.
            </p>

            <p>
              Baseado em tecnologia avançada e um corpo técnico especializado,
              no Atmos - Centro Integrado de Monitoramento e Inteligência
              Meteorológica da Eletrobras - você encontra informações com
              precisão, personalizadas e com foco nas áreas de negócio da
              empresa.
            </p>
          </S.Subtitle>
        </S.TitleContainer>
      </Card.Header>
      <Card.Body>
        <S.CardBodyContainer>
          <Card.Wrapper>
            <S.CardImageContainer>
              <Image src="/icons/DashboardIcon.svg" width={56} height={56} />
              <div className="description">
                <h5>Dashboard</h5>
                <span>
                  Dashboard - previsão de eventos meteorológicos adversos e com
                  possível impacto aos ativos de transmissão da empresa
                </span>
              </div>
              <button onClick={handleRedirectToDashboard}>Acesse agora!</button>
            </S.CardImageContainer>
          </Card.Wrapper>
          <Card.Wrapper>
            <S.CardImageContainer>
              <Image src="/icons/ReportIcon.svg" width={56} height={56} />
              <div className="description">
                <h5>Boletim Especial</h5>
                <span>
                  Previsão meteorológica para planejamento de atividades e
                  otimização de recursos
                </span>
              </div>
              <button onClick={handleRedirectToReport}>Acesse agora!</button>
            </S.CardImageContainer>
          </Card.Wrapper>
          <Card.Wrapper>
            <S.CardImageContainer>
              <Image src="/icons/WorkspaceIcon.svg" width={56} height={56} />
              <div className="description">
                <h5>SMAC</h5>
                <span>Suite da Climatempo</span>
              </div>
              <button onClick={handleRedirectToSMAC}>Acesse agora!</button>
            </S.CardImageContainer>
          </Card.Wrapper>
          <Card.Wrapper>
            <S.CardImageContainer>
              <Image src="/icons/ReportIcon.svg" width={56} height={56} />
              <div className="description">
                <h5>Boletim Diário</h5>
                <span>
                  Previsão meteorológica para planejamento de atividades e
                  otimização de recursos
                </span>
              </div>
              <button onClick={handleRedirectToDailyReport}>
                Acesse agora!
              </button>
            </S.CardImageContainer>
          </Card.Wrapper>
        </S.CardBodyContainer>
      </Card.Body>
    </Card.Wrapper>
  );
};

export default Welcome;
