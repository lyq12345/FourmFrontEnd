import React from 'react';

// import assets
import logo from '@/assets/bbs/logo/logo_bbs.png';
import png1 from '@/assets/bbs/icon/png1.png';
import png2 from '@/assets/bbs/icon/png2.png';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const Navbar: React.FC = React.memo(() => {
  return (
    <div
      style={{
        width: 1200,
        margin: '0 auto',
        overflow: 'visible',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img src={logo} style={{ width: 208, height: 65, marginRight: 689 }} />
      <img src={png1} style={{ width: 20, height: 20, marginRight: 5 }} />
      <span style={{ color: '#666666' }}>内网首页</span>
      <img src={png2} style={{ width: 20, height: 20, marginLeft: 40, marginRight: 5 }} />
      <span style={{ color: '#666666' }}>
        {dayjs().locale('zh-cn').format('YYYY年MM月DD日 dddd')}
      </span>
    </div>
  );
});

export default Navbar;
