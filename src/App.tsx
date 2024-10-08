import React from 'react';
import styled from 'styled-components';
import OrderActionCard from './components/OrderActionCard';
import { orders } from './utils/orderData';
import { FigmaTheme } from './utils/figmaData';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

// base global styles
const Main = styled.main`
  background-color: ${FigmaTheme.colors.backgrounds.global};
  color: ${FigmaTheme.colors.typography.base};
  font-family: Inter, sans-serif;
  line-height: ${FigmaTheme.typography.body.medium.lineHeight}; /* consistent throughout all typography sets */
  min-height: calc(100vh - 48px); /* offset padding, take up full height */
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
