import React from 'react';
import styled from 'styled-components';
import { FigmaTheme } from '../utils/figmaData';
import FeatherIcon from 'feather-icons-react';

type Variant = 'primary' | 'secondary';

interface ButtonProps {
  variant: Variant;
  children: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
}

const StyledButton = styled.button<{ variant: string }>`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid ${FigmaTheme.colors.borders.transparent} !important; // overrides browser styling
  font-weight: ${FigmaTheme.typography.body.strong.fontWeight};
  font-size: ${FigmaTheme.typography.body.strong.fontSize};
  line-height: ${FigmaTheme.typography.body.strong.lineHeight};
  color: ${FigmaTheme.colors.typography.base};

  ${({ variant }) => {
    switch (variant) {
    case 'primary':
      return `
        background-color: ${FigmaTheme.colors.buttons.primary.default};

        &:hover, &:focus {
          background-color: ${FigmaTheme.colors.buttons.primary.hover};
        }

        &:active {
          background-color: ${FigmaTheme.colors.buttons.primary.pressed};
        }
      `;
    default:
      return `
        background-color: ${FigmaTheme.colors.buttons.secondary.default};

        &:hover, &:focus {
          background-color: ${FigmaTheme.colors.buttons.secondary.hover};
        }

        &:active {
          background-color: ${FigmaTheme.colors.buttons.secondary.pressed};
        }
      `;
    }
  }};

  &:disabled {
    cursor: default;
    color: ${FigmaTheme.colors.typography.tertiary};
    background-color: ${FigmaTheme.colors.buttons.disabled};
  }
`;

const Button = ({
  children = 'Submit',
  variant,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <StyledButton {...props} variant={variant}>
    {leftIcon && (
      <FeatherIcon size={12} icon={leftIcon} />
    )}
    {children}
    {rightIcon && (
      <FeatherIcon size={12} icon={rightIcon} />
    )}
  </StyledButton>
);

export default Button;
