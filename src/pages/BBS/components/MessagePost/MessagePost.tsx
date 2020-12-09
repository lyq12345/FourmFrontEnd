import React from 'react';
import { Post } from '../../api';

export type MessagePostProps = {
  post: Post;
};

export default React.memo<MessagePostProps>(({ post }) => {
  return <div>message</div>;
});
