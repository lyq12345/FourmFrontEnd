import React from 'react';
import { requestMyPosts } from '../api';
import NormalPostList from '../components/NormalPostList';

export default React.memo(() => {
  return <NormalPostList requestFn={requestMyPosts} />;
});
