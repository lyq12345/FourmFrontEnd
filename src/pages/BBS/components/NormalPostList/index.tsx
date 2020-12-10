import { PostEventContext } from '@/layouts/BBSLayout/store';
import { useInViewport, useUpdateEffect } from 'ahooks';
import React, { useContext, useEffect, useState } from 'react';
import { Post } from '../../api';
import BBSLoading from '../BBSLoading';
import NormalPost from '../NormalPost/NormalPost';

export type ListProps<T> = {
  requestFn: (page: number) => Promise<{ data: T }>;
  targetSelector?: string;
};

type List<T = { threads: Post[] }> = React.FC<ListProps<T>>;

const List: List = ({ requestFn, targetSelector = '#bbs-footer' }) => {
  const postEvent$ = useContext(PostEventContext);
  postEvent$?.useSubscription((val) => {
    if (val === 'success') {
      setPage(1);
    }
  });

  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    requestFn(page)
      .then((res) => {
        if (page === 1) {
          setData(res.data.threads);
        } else {
          setData((data) => data.concat(res.data.threads));
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  const inViewport = useInViewport(() => document.querySelector(targetSelector));
  useUpdateEffect(() => {
    setPage((c) => c + 1);
  }, [inViewport]);

  const [loading, setLoading] = useState(false);

  return (
    <>
      {data?.map((v) => (
        <NormalPost key={v.threadId} post={v} />
      ))}
      <div style={{ textAlign: 'center' }}>
        <BBSLoading loading={loading} />
      </div>
    </>
  );
};

export default List;
