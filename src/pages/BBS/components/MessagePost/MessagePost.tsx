import { IconFont, useDebounceFn } from '@/utils/utilsBBS';
import { Avatar } from 'antd';
import React, { useCallback, useState } from 'react';
import { Post, requestLove } from '../../api';

export type MessagePostProps = {
  post: Post;
};

export default React.memo<MessagePostProps>(({ post }) => {
  return <div>message</div>;
});
