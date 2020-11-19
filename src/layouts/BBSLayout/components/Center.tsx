import React from 'react';

const Center: React.FC = React.memo(({ children }) => {
  return <div style={{ width: 670 }}>{children}</div>;
});

export default Center;
