import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Prompt', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #303036;
`;

export const ContainerFilters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
  border: 0.1rem solid #ddd;
  border-radius: 0.5 rem;
  border-top: 1rem solid #0088cc;
`;

export const ContainerSubtitle = styled.span`
  font-size: 2.4rem;
  font-weight: 400;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const ContainerVariationInformation = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const VariationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  gap: 2rem;
`;

export const VariationContainerItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 5rem;
  font-weight: 400;
  font-size: 1.8rem;
  border: 0.1rem solid #8da3ae;
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 1rem;
`;

export const Button = styled.button<{ primary: boolean }>`
  background-color: ${({ primary }) => {
    return primary ? '#00a61c;' : '#0070a8;';
  }};
  margin-top: 5rem;
  width: 20rem;
  height: 3.5rem;
  color: #fafafa;
  border: none;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: 'Prompt', sans-serif;
  border-radius: 5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: ${({ primary }) => {
      return primary ? '#218838;' : '#0056b3;';
    }};
  }
`;
