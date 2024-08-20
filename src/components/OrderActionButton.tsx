import React, { ReactNode, useState, useCallback, useMemo } from 'react';
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
  background-color: transparent;
  border-top: 1px solid ${FigmaTheme.colors.borders.transparent};
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 16px 0;
  cursor: pointer;

  &::first-of-type {
    border-top-width: 0;
  }

  /* not in figma, but offering this as an indicator of being interactive; would bring up with designers */
  > *:first-child {
    transition: transform 150ms ease-out;
  }

  &:hover, &:focus {
    > *:first-child {
      transform: translateX(4px);
    }
  }

  &:disabled {
    cursor: default;
    > *:first-child {
      transform: none;
    }
  }
`;

const IconWrapper = styled.span`
  display: flex;
  gap: 12px;
  align-items: center;
  font-weight: ${FigmaTheme.typography.body.medium.fontWeight};


  svg {
    stroke: ${FigmaTheme.colors.iconography.iconography};
  }
`;

const OrderActionButton = ({ order, variant }: OrderActionButtonProps) => {
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onConfirmDeliverySubmit = useCallback(() => {
    setActionModalOpen(false);
    setIsComplete(true);
  }, []);

  const onClose = useCallback(() => {
    setActionModalOpen(false);
  }, []);

  const variants: Record<Variant, VariantProps> = useMemo(() => ({
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
  }), [order, onClose, onConfirmDeliverySubmit]);

  const maybeOpenModal = useCallback(() => {
    if (variants[variant].modalContent) {
      setActionModalOpen(true);
    }
  }, [variant, variants]);

  const { title, icon, modalContent } = variants[variant];

  return (
    <>
      <StyledActionButton
        type="button"
        onClick={maybeOpenModal}
        disabled={isComplete}
        aria-label={isComplete ? `${title} - Completed` : title}
      >
        <IconWrapper>
          {!isComplete ? icon : <FeatherIcon icon='check-circle' size='16' />}
          {title}
        </IconWrapper>
        {isComplete && <Badge variant='green'>Confirmed</Badge>}
      </StyledActionButton>
      {modalContent && !isComplete && (
        <Modal onClose={onClose} isOpen={actionModalOpen}>
          {modalContent}
        </Modal>
      )}
    </>
  );
};

export default OrderActionButton;
