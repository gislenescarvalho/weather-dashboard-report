import styled from 'styled-components';

export const MenuContainer = styled.nav`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-left: 1.5rem;
`;

export const MenuItem = styled.div<{ active: boolean }>`
  font-family: Prompt;
  font-size: 28px;
  font-family: 'Prompt', sans-serif;
  font-weight: 700;
  line-height: 33.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  color: ${({ active }) => (active ? '#0088CC' : '#c0c0c0')};
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: ${({ active }) => (active ? '2px solid #0088CC' : 'none')};

  &:hover {
    color: ${({ active }) => (active ? '#0088CC' : '#808080')};
  }
`;
