import { requestLatestPosts } from '@/pages/BBS/api';
import NormalPostList from '@/pages/BBS/components/NormalPostList';
import PostCreator from '@/pages/BBS/components/PostCreator/PostCreator';
import React from 'react';
import styles from './BBSCard.less';
import { useHistory } from 'umi';

export default React.memo(() => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <p style={{ fontSize: 18, fontWeight: 600 }}>堂里论坛</p>
        <p
          style={{ fontSize: 16, color: '#666', cursor: 'pointer' }}
          onClick={() => {
            history.push('/bbs');
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
