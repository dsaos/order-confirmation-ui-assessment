import React from 'react';
import styled from 'styled-components';
import { Order } from '../types';
import { FigmaTheme } from '../utils/figmaData';
import OrderActionButton from './OrderActionButton';

type OrderActionCardProps = {
  order: Order;
}

const OrderActionCardContainer = styled.section`
  background-color: ${FigmaTheme.colors.backgrounds.container};
  margin: 0 auto 1rem;
  border-radius: 8px;
  min-width: 160px;
  max-width: 700px; /* make this too long and it can be hard to tell what is confirmed */
  overflow: hidden; /* clips the header to the border-radius above */
  box-shadow: 0 2px 2px 0 #00000026;

  header {
    background-color: ${FigmaTheme.colors.backgrounds.nestedContainer};
    padding: 14px 16px;

    & > h1 {
      color: ${FigmaTheme.colors.typography.black};
      font-size: ${FigmaTheme.typography.body.medium.fontSize};
      font-weight: ${FigmaTheme.typography.body.medium.fontWeight};
    }

    & > h2 {
      color: ${FigmaTheme.colors.typography.secondary};
      font-size: ${FigmaTheme.typography.caption.fontSize};
      font-weight: ${FigmaTheme.typography.caption.fontWeight};
    }
  }
`;

const OrderActionButtonContainer = styled.div`
  border-top: 1px solid ${FigmaTheme.colors.borders.transparent};
  padding: 0 0 0 16px; /* TODO: raise the strange padding with the designers */

  button:first-child {
    border-top-width: 0;
  }
`;

const OrderActionCard = ({order}: OrderActionCardProps) => (
  <OrderActionCardContainer>
    <header>
      <h1>Order #{order.id}</h1>
      {order.description && (
        <h2>{order.description}</h2>
      )}
    </header>
    <OrderActionButtonContainer>
      <OrderActionButton order={order} variant='confirmDelivery' />
      <OrderActionButton order={order} variant='recordPayment' />
    </OrderActionButtonContainer>
  </OrderActionCardContainer>
);

export default OrderActionCard;
