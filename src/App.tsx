import React from 'react';
import styled from 'styled-components';
import OrderActionCard from './components/OrderActionCard';
import { orders } from './utils/orderData';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

// base global styles
const Main = styled.main`
  font-family: Inter, sans-serif;
  min-height: calc(100vh - 48px); // offset padding, take up full height
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

const App = () => {
  // fetch orders; this would normally be an API call but we're just mocking it for this assessment
  const orderData = orders;

  return (
    <Main>
      {orderData.map((order) => (
        <OrderActionCard key={order.id} order={order} />
      ))}
    </Main>
  );
};

export default App;
