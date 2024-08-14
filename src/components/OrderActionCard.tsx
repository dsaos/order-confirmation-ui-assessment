import React from 'react';
import styled from 'styled-components';
import { Order } from '../types';
import OrderActionButton from './OrderActionButton';

type OrderActionCardProps = {
  order: Order;
}

const OrderActionCardContainer = styled.section`
`;

const OrderActionButtonContainer = styled.div`
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
