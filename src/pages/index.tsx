import { Home } from 'components/Home';
import { useAuth } from 'src/hooks/useAuth';
import * as S from 'styles/pages/home-page.styles';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;
  return (
    <S.Container>
      {' '}
      <S.WelcomeWrapper>
        <Home.Welcome />
      </S.WelcomeWrapper>
    </S.Container>
  );
};

export default HomePage;
