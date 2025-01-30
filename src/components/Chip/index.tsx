import React from 'react';

import * as S from './styles';

export type ChipVariants =
  | 'primary-blue'
  | 'primary-green'
  | 'secondary-green'
  | 'primary-red'
  | 'primary-yellow';

type ChipProps = {
  text: string;
  variant: ChipVariants;
};

const Chip = ({ text, variant }: ChipProps) => {
  const variants = {
    'primary-blue': {
      background: 'var(--color-primary-blue)',
      color: 'var(--color-neutral-white)',
    },
    'primary-green': {
      background: 'var(--color-green-300)',
      color: 'var(--color-base-black)',
    },
    'secondary-green': {
      background: 'var(--color-secondary-green)',
      color: 'var(--color-neutral-white)',
    },
    'primary-yellow': {
      background: 'var(--color-medium-champagne)',
      color: 'var(--color-base-black)',
    },
    'primary-red': {
      background: 'var(--color-neutral-light-red)',
      color: 'var(--color-base-black)',
    },
  };

  return (
    <S.Wrapper variant={variants[variant]}>
      <span>{text}</span>
    </S.Wrapper>
  );
};

export default Chip;
