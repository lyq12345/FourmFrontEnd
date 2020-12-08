import { useInViewport, useUpdateEffect } from 'ahooks';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Post } from '../../api';
import NormalPost from '../NormalPost/NormalPost';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#ff5000' }} spin />;

export type ListProps<T> = {
  requestFn: (page: number) => Promise<{ data: T }>;
  targetSelector?: string;
};

type List<T = { threads: Post[] }> = React.FC<ListProps<T>>;

const List: List = ({ requestFn, targetSelector = '#bbs-footer' }) => {
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
      {data.map((v) => (
        <NormalPost key={v.threadId} post={v} />
      ))}
      <div style={{ textAlign: 'center' }}>
        <Spin spinning={loading} delay={500} indicator={antIcon} />
      </div>
    </>
  );
};

export default List;
