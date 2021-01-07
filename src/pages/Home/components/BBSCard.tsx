import { requestLatestPosts } from '@/pages/BBS/api';
import NormalPostList from '@/pages/BBS/components/NormalPostList';
import PostCreator from '@/pages/BBS/components/PostCreator/PostCreator';
import React from 'react';
import styles from './BBSCard.less';

export default React.memo(() => {
  return (
    <div className={styles.container}>
      <div style={{ background: 'white', paddingTop: 20, borderRadius: 6 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px',
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 600 }}>堂里论坛</p>
          <p
            style={{ fontSize: 14, color: '#666', cursor: 'pointer' }}
            onClick={() => {
              open(`${origin}/yst-iwork-alpha/bbs`);
            }}
          >
            更多
          </p>
        </div>
        <PostCreator
          isInnerPrimaryColorUsed={false}
          style={{
            margin: 20,
            marginBottom: 0,
            background: '#f6f6f6',
          }}
        />
      </div>
      <div className={styles['list']}>
        <NormalPostList requestFn={requestLatestPosts} isInnerPrimaryColorUsed={false} />
      </div>
    </div>
  );
});
