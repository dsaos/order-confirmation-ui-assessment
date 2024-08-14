import React from 'react';
import styled from 'styled-components';
import { FigmaTheme } from '../utils/figmaData';

type Variant = 'green';

interface BadgeProps {
  variant: Variant;
  text: string;
}

const StyledBadge = styled.div<{ variant: string }>`
  padding: 4px;
  border-radius: 3px;
  border: 1px solid ${FigmaTheme.colors.borders.transparent};
  font-weight: ${FigmaTheme.typography.elementSpecific.badge.fontWeight};
  font-size: ${FigmaTheme.typography.elementSpecific.badge.fontSize};
  line-height: ${FigmaTheme.typography.elementSpecific.badge.lineHeight};

  color: ${({ variant }) => {
    switch (variant) {
    case 'green':
      return FigmaTheme.colors.dynamicAccents.green.foreground;
    }
  }};

  background-color: ${({ variant }) => {
    switch (variant) {
    case 'green':
      return FigmaTheme.colors.dynamicAccents.green.background;
    }
  }};
`;

const Badge = ({ variant = 'green', text = 'Confirmed' }: BadgeProps) => (
  <StyledBadge variant={variant}>
    {text}
  </StyledBadge>
);

export default Badge;
