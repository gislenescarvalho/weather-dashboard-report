import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-base-white);
  .error {
    font-family: 'Prompt', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--color-gray-800);
  }
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

export { PageContainer };
