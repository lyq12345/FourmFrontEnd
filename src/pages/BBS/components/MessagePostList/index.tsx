import React, { useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';
import { useInViewport, useUpdateEffect } from 'ahooks';
import { Message } from '../../api';
import MessagePost from '../MessagePost/MessagePost';
import { ListProps } from '../NormalPostList';
import { EventContext } from '@/layouts/BBSLayout/BBSLayout';
import BBSLoading from '../BBSLoading';

type MessageList<T = { posts: Message[] }> = React.FC<ListProps<T>>;

const List2: MessageList = ({ requestFn, targetSelector = '#bbs-footer' }) => {
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const event$ = useContext(EventContext);
  event$?.useSubscription((val) => {
    if (val === 'success') {
      setPage(1);
    }
  });

  useEffect(() => {
    setLoading(true);
    requestFn(page)
      .then((res) => {
        if (page === 1) {
          setMsgList(res.data.posts);
        } else {
          setMsgList((data) => data.concat(res.data.posts));
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  const inViewport = useInViewport(() => document.querySelector(targetSelector));
  useUpdateEffect(() => {
    setPage((c) => c + 1);
  }, [inViewport]);

  return (
    <div>
      {msgList.map((item) => (
        <MessagePost key={item.postId} message1={item} />
      ))}
      <div style={{ textAlign: 'center' }}>
        <BBSLoading loading={loading} />
      </div>
    </div>
  );
};

export default List2;
