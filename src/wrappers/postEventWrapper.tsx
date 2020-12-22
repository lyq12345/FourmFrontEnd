import React from 'react';
import { PostEventContext } from '@/layouts/BBSLayout/store';
import { useEventEmitter } from 'ahooks';

export default function WrapperPostEventContext(props) {
  // 发帖事件
  const postEvent$ = useEventEmitter();
  return <PostEventContext.Provider value={postEvent$}>{props.children}</PostEventContext.Provider>;
}
