import React from 'react';
import AllMarketDisplay from './AllMarketDisplay';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Landing Page for Wulfey's Binance API Project</h3>
      <p>Various functions will be added here.</p>
      <p>The tabs above correspond to sub components with various features.</p>
      <AllMarketDisplay />
    </div>
  );
};

export default Landing;
