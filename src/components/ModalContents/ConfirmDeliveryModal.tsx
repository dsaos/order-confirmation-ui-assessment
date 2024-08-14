import React, { useState } from 'react';
import styled from 'styled-components';
import { useOrderIdValidation } from '../../utils/useOrderIdValidation';
import { FigmaTheme } from '../../utils/figmaData';
import Button from '../Button';
import FeatherIcon from 'feather-icons-react';

interface ConfirmDeliveryModalProps {
  onCancel: () => void;
  onSubmit: (data: string) => void;
  orderId: number;
}

const TextInput = styled.input<{ $isInvalid: boolean }>`
  padding: 12px 16px;
  border-radius: 4px;
  font-size: ${FigmaTheme.typography.body.regular.fontSize};
  font-weight: ${FigmaTheme.typography.body.regular.fontWeight};
  color: ${FigmaTheme.colors.typography.base};
  border: 1px solid ${FigmaTheme.colors.borders.formOutlineDefault};
  transition: border-color 200ms ease-in-out;
  border-color: ${({ $isInvalid }) => $isInvalid ? FigmaTheme.colors.borders.formOutlineCritical : FigmaTheme.colors.borders.formOutlineDefault};

  &:hover {
    border-color: ${({ $isInvalid }) => $isInvalid ? FigmaTheme.colors.borders.formOutlineCritical : FigmaTheme.colors.borders.formOutlineHover};
  }

  &:focus, &:active {
    outline: 0; // bad practice for screen readers but hey, Figma
    border-color: ${FigmaTheme.colors.borders.formOutlineActive} !important;
  }
`;

const ModalBody = styled.div`
  padding: 32px 24px;
  background-color: ${FigmaTheme.colors.backgrounds.container};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;

  h1 {
    font-size: ${FigmaTheme.typography.headings.containerTitle.fontSize};
    font-weight: ${FigmaTheme.typography.headings.containerTitle.fontWeight};
  }

  p {
    font-weight: ${FigmaTheme.typography.body.medium.fontWeight};
    font-size: ${FigmaTheme.typography.body.medium.fontSize};
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;

    svg {
      margin-bottom: 12px;
      color: ${FigmaTheme.colors.iconography.iconography};
    }
  }
`;

const ModalFooter = styled.div`
  padding: 16px;
  background-color: ${FigmaTheme.colors.backgrounds.container};
  border-top: 1px solid ${FigmaTheme.colors.borders.transparent};
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: stretch;

  > * {
    flex: 1 1 100%; // make buttons equal width
  }
`;


const ConfirmDeliveryModal = ({ onCancel, onSubmit, orderId }: ConfirmDeliveryModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const { validate, error } = useOrderIdValidation(orderId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(inputValue as string)) {
      onSubmit(inputValue);
    }
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
    validate(e.target.value as string);
  };

  // only show the appropriate input validity if it's dirty
  // this could be simplified with a form library like react-hook-form but i'm trying to minimize imports and go quick!
  const inputIsInvalid = inputValue.length === 0 ? false : error;

  return (
    <form onSubmit={handleSubmit}>
      <ModalBody>
        <div>
          <FeatherIcon icon='alert-triangle' size='24' />
          <h1>Confirm delivery for Order #{orderId}</h1>
          <p>Enter the order number to confirm delivery</p>
        </div>
        <TextInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          $isInvalid={inputIsInvalid} // `$` prefix prevents this attr being relayed to DOM, which is invalid
        />
      </ModalBody>
      <ModalFooter>
        <Button
          variant='primary'
          leftIcon='check'
          onClick={handleSubmit}
          type='submit'
          disabled={error}>
            Confirm delivery
        </Button>
        <Button
          variant='secondary'
          leftIcon='x'
          onClick={onCancel}
          type='reset'>
            Cancel
        </Button>
      </ModalFooter>
    </form>
  );
};

export default ConfirmDeliveryModal;
