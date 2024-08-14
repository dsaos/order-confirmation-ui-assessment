import React, { useState } from 'react';
import styled from 'styled-components';
import { useOrderIdValidation } from '../../utils/useOrderIdValidation';
import FeatherIcon from 'feather-icons-react';

interface ConfirmDeliveryModalProps {
  onCancel: () => void;
  onSubmit: (data: string) => void;
  orderId: number;
}

const TextInput = styled.input<{ $isInvalid: boolean }>`
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
      <div>
        <FeatherIcon icon='alert-triangle' size='24' />
        <h1>
        Confirm delivery for Order #{orderId}
        </h1>
        <p>Enter the order number to confirm delivery</p>
        <TextInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          $isInvalid={inputIsInvalid} // `$` prefix prevents this attr being relayed to DOM, which is invalid
        />
      </div>
      <div>
        <button type="submit" disabled={error}>Submit</button>
        <button type="reset" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ConfirmDeliveryModal;
