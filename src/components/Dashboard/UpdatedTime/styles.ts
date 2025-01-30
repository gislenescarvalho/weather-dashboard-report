import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  min-width: 200px;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const DateText = styled.span`
  margin-left: 8px;
  color: #0088CC;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 0.8rem;
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.4rem;
    color: var(--color-base-black);
  }

  #date {
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.4rem;
    color: var(--color-primary-blue);
  }
`;
