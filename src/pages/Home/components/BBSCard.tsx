import { requestLatestPosts } from '@/pages/BBS/api';
import NormalPostList from '@/pages/BBS/components/NormalPostList';
import PostCreator from '@/pages/BBS/components/PostCreator/PostCreator';
import React from 'react';
import styles from './BBSCard.less';

export default React.memo(() => {
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <p style={{ fontSize: 18, fontWeight: 600 }}>堂里论坛</p>
        <p
          style={{ fontSize: 16, color: '#666', cursor: 'pointer' }}
          onClick={() => {
            open(`${origin}/yst-iwork-alpha/bbs`);
          }}
        >
          更多
        </p>
      </div>
      <PostCreator dropdownClassName={styles['select-dropdown']} />
      <NormalPostList requestFn={requestLatestPosts} />
    </div>
  );
});
