import { useInViewport, useUpdateEffect } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { Message } from '../../api';
import BBSLoading from '../BBSLoading';
import MessagePost from '../MessagePost/MessagePost';
import { ListProps } from '../NormalPostList';
import noComments from '@/assets/bbs/noComments.png';

type MessageList<T = { posts: Message[] }> = React.FC<ListProps<T>>;

const List2: MessageList = ({ requestFn, targetSelector = '#bbs-footer' }) => {
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    requestFn(page)
      .then((res) => {
        if (res.success) {
          if (page === 1) {
            setMsgList(res.data.posts);
          } else {
            setMsgList((data) => data.concat(res.data.posts));
          }
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  const inViewport = useInViewport(() => document.querySelector(targetSelector));
  useUpdateEffect(() => {
    if (inViewport) {
      setPage((c) => c + 1);
    }
  }, [inViewport]);

  return (
    <div>
      {msgList.map((item) => (
        <MessagePost key={item.postId} message1={item} />
      ))}
      <div style={{ textAlign: 'center' }}>
        <BBSLoading loading={loading} />
      </div>
      {!loading && (!msgList || msgList?.length === 0) && (
        <div
          style={{
            textAlign: 'center',
            padding: '180px 0',
            fontSize: 18,
            color: '#666',
            lineHeight: '25px',
          }}
        >
          <img src={noComments} alt="noContent" width={130} style={{ marginBottom: 18 }} />
          <br />
          暂无消息
        </div>
      )}
    </div>
  );
};

export default List2;
