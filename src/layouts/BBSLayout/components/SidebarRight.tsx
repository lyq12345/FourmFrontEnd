import React from 'react';
import png from '@/assets/bbs/avatar.png';

const SidebarRight: React.FC = React.memo(() => {
  return (
    <div style={{ width: 307, marginLeft: 12 }}>
      <div style={{ height: 223, display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
        <img src={png} alt="avatar" style={{ margin: '65px 0 15px 0', width: 72, height: 72 }} />
        <span style={{ lineHeight: '20px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>
          name
        </span>

        <div
          style={{
            marginTop: 9,
            width: 92,
            height: 32,
            lineHeight: '32px',
            color: '#ffffff',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #FF6C29 0%, #EB0029 100%)',
            borderRadius: 4,
          }}
        >
          我要发帖
        </div>
      </div>
    </div>
  );
});

export default SidebarRight;
