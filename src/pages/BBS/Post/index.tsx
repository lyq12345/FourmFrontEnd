import React from 'react';
import { useParams } from 'umi';

const Post: React.FC = React.memo(() => {
  const { postId } = useParams();
  return postId;
});

export default Post;
