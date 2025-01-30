import React from 'react';

import * as S from './styles';

type SelectorChartProps = {
  selectedChart: any;
  handleButtonClick?: any;
  options?: string[] | undefined;
};

/**
 * Component that renders a group of chart selection buttons.
 *
 * @param {any} selectedChart - The currently selected chart option.
 * @param {function} [handleButtonClick] - Function to handle button click events, receiving the selected option as an argument.
 * @param {string[] | undefined} [options] - An array of chart options to display as buttons.
 *
 * @returns {React.ReactElement} A group of buttons for selecting charts, highlighting the currently selected chart.
 */
const SelectorChart: React.FC<SelectorChartProps> = ({
  selectedChart,
  handleButtonClick,
  options,
}) => {
  return (
    <S.ButtonGroup>
      {options?.map(option => (
        <S.ChartButton
          key={option}
          selected={selectedChart === option}
          onClick={() => handleButtonClick(option)}>
          {option}
        </S.ChartButton>
      ))}
    </S.ButtonGroup>
  );
};
export default SelectorChart;
