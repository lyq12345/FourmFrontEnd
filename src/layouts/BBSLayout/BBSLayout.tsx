import React from 'react';
import Center from './components/Center';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SidebarRight from './components/SidebarRight';

const BBSLayout: React.FC = React.memo(({ children }) => {
  return (
    <div
      style={{
        background: '#f4f4f4',
      }}
    >
      <div
        style={{
          height: 4,
          background: 'linear-gradient(139deg, #FF6C29 0%, #EF0000 100%)',
        }}
      />

      {/* 顶部导航 */}
      <div
        style={{
          boxShadow: '0 2px 14px 0px #E8E7E7',
          background: 'white',
        }}
      >
        <Navbar />
      </div>

      <div
        style={{
          width: 1200,
          margin: '0 auto',
          paddingTop: 40,
          paddingBottom: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Sidebar />
          <Center children={children} />
          <SidebarRight />
        </div>
      </div>

      <Footer />
    </div>
  );
});

export default BBSLayout;
