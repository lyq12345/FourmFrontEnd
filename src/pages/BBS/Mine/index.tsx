import React from 'react';
import { requestMyPosts } from '../api';
import NormalPostList from '../components/NormalPostList';

export default React.memo(() => {
  return (
    <>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1,
          margin: '12px 0',
          fontWeight: 500,
          color: '#333',
        }}
      >
        我发的帖子
      </p>
      <NormalPostList requestFn={requestMyPosts} />
    </>
  );
});
