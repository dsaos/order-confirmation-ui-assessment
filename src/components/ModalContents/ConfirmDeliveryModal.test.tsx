import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeliveryModal from './ConfirmDeliveryModal';

describe('ConfirmDeliveryModal', () => {
  const mockOnCancel = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with the given orderId', () => {
    render(
      <ConfirmDeliveryModal
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        orderId={12345}
      />
    );

    expect(screen.getByText('Confirm delivery for Order #12345')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter order number')).toBeInTheDocument();
  });

  test('handles input change and validation', () => {
    render(
      <ConfirmDeliveryModal
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        orderId={12345}
      />
    );

    const input = screen.getByPlaceholderText('Enter order number');
    fireEvent.change(input, { target: { value: '12345' } });

    expect(input).toHaveValue('12345');
  });

  test('triggers onSubmit with correct data when form is valid', () => {
    render(
      <ConfirmDeliveryModal
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        orderId={12345}
      />
    );

    const input = screen.getByPlaceholderText('Enter order number');
    fireEvent.change(input, { target: { value: '12345' } });

    const submitButton = screen.getByText('Confirm delivery');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('12345');
  });

  test('does not trigger onSubmit if validation fails', () => {
    render(
      <ConfirmDeliveryModal
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        orderId={12345}
      />
    );

    const input = screen.getByPlaceholderText('Enter order number');
    fireEvent.change(input, { target: { value: 'invalid' } });

    const submitButton = screen.getByText('Confirm delivery');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('triggers onCancel when the cancel button is clicked', () => {
    render(
      <ConfirmDeliveryModal
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        orderId={12345}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
