import React from 'react';

const BBSLayout: React.FC = React.memo(({ children }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          position: 'absolute',
          height: 4,
          left: 0,
          right: 0,
          background: 'linear-gradient(139deg, #FF6C29 0%, #EF0000 100%)',
        }}
      />

      <div style={{ minWidth: 1440 }}></div>

      <section>{children}</section>
      <footer></footer>
    </div>
  );
});

export default BBSLayout;
