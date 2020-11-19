import React from 'react';
import { useHistory } from 'umi';
import png1 from '@/assets/bbs/icon/png1.png';

import styles from './Sidebar.less';
import Button from './Button';

const t: React.FC = React.memo(() => {
  const history = useHistory();
  return (
    <div style={{ width: 156, margin: '0 32px 0 23px' }}>
      <Button iconDataURL={png1} onClick={() => history.push('#123')}>
        首页
      </Button>
      <Button iconDataURL={png1} onClick={() => history.push('#')}>
        消息
      </Button>
      <Button iconDataURL={png1} onClick={() => history.push('#')}>
        广场
      </Button>
      <Button iconDataURL={png1} onClick={() => history.push('#')}>
        我的
      </Button>

      {/* 分割线 */}
      <div className={styles.divider}>
        <div className={styles.line} />
        <span style={{ margin: '0 6px', color: '#666666', fontSize: 10 }}>精选版块</span>
        <div className={styles.line} />
      </div>

      <div className={styles.blockList}>
        <p>人事类</p>
        <p>人事类</p>
        <p>人事类</p>
        <p>人事类</p>
        <p>人事类</p>
        <p>人事类</p>
        <p>人事类</p>
        <p>人事类</p>
      </div>
    </div>
  );
});

export default t;
