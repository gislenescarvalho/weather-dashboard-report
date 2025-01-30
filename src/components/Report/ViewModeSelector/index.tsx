import React from 'react';

import {
  Label,
  SelectorContainer,
  ToggleButton,
  ToggleButtonGroup,
} from './styles';

type ViewModeSelectorProps = {
  viewMode?: any;
  setViewMode?: any;
};

/**
 * Component that renders a toggle button group to select the view mode for a
 * given component.
 *
 * @prop {string} viewMode - The current view mode ('table' or 'graphic').
 * @prop {function} setViewMode - Function to change the view mode.
 *
 * @returns {ReactElement} JSX element with the toggle button group.
 */
const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  viewMode,
  setViewMode,
}) => {
  return (
    <SelectorContainer>
      <Label>Visualização:</Label>
      <ToggleButtonGroup>
        <ToggleButton
          active={viewMode === 'table'}
          onClick={() => setViewMode('table')}>
          Tabela
        </ToggleButton>
        <ToggleButton
          active={viewMode === 'graphic'}
          onClick={() => setViewMode('graphic')}>
          Gráfico
        </ToggleButton>
      </ToggleButtonGroup>
    </SelectorContainer>
  );
};

export default ViewModeSelector;
