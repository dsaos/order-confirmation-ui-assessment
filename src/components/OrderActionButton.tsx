import React, { ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FigmaTheme } from '../utils/figmaData';
import FeatherIcon from 'feather-icons-react';
import { Order } from '../types';
import Modal from './Modal';
import Badge from './Badge';
import ConfirmDeliveryModal from './ModalContents/ConfirmDeliveryModal';

type Variant = 'confirmDelivery' | 'recordPayment';

// let's assume that for every action someone can take on an order, it will pop a modal with a form
interface VariantProps {
  title: string;
  icon: ReactNode;
  modalContent?: ReactNode;
  completionStatus: boolean; // for determining if step is already complete on load
}

interface OrderActionButtonProps {
  order: Order;
  variant: Variant;
}

const StyledActionButton = styled.button`
  border: 0;
  background: transparent;
  border-top: 1px solid ${FigmaTheme.colors.borders.transparent};
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 16px 0;

  span {
    display: flex;
    gap: 12px;
    align-items: center;
    font-weight: ${FigmaTheme.typography.body.medium.fontWeight};

    svg {
      stroke: ${FigmaTheme.colors.iconography.iconography} // feels bad
    }
  }

  &::first-of-type {
    border-top-width: 0;
  }
`;

const OrderActionButton = ({ order, variant }: OrderActionButtonProps) => {
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onConfirmDeliverySubmit = () => {
    // this is where an API call would go for the confirmDelivery variant. but for now let's keep it local
    setActionModalOpen(false);
    setIsComplete(true);
  };

  const onClose = () => {
    setActionModalOpen(false);
  };

  // declare our variants
  const variants: Record<Variant, VariantProps> = {
    confirmDelivery: {
      title: 'Confirm delivery',
      icon: <FeatherIcon icon="package" size="16" />,
      modalContent: <ConfirmDeliveryModal orderId={order.id} onSubmit={onConfirmDeliverySubmit} onCancel={onClose} />,
      completionStatus: order.deliveryConfirmed
    },
    recordPayment: {
      title: 'Record payment',
      icon: <FeatherIcon icon="dollar-sign" size="16" />,
      completionStatus: order.paymentRecorded
    }
  };

  const {
    title,
    icon,
    modalContent,
    completionStatus
  } = variants[variant];

  useEffect(() => {
    if (completionStatus) {
      setIsComplete(true);
    }
  }, [completionStatus]);

  const maybeOpenModal = () => {
    if (modalContent) {
      setActionModalOpen(true);
    }
  };

  return (
    <>
      <StyledActionButton type="button" onClick={maybeOpenModal} disabled={isComplete}>
        <span>
          {!isComplete ? icon : (
            <FeatherIcon icon='check-circle' size='16' />
          )}
          {title}
        </span>
        {isComplete && (
          <Badge variant='green' text='Confirmed' />
        )}
      </StyledActionButton>
      {(modalContent && !isComplete) && (
        <Modal onClose={onClose} isOpen={actionModalOpen}>
          {modalContent}
        </Modal>
      )}
    </>
  );
};

export default OrderActionButton;
