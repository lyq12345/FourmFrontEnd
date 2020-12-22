import { PostEventContext } from '@/layouts/BBSLayout/store';
import { useInViewport, useToggle, useUpdateEffect, useWhyDidYouUpdate } from 'ahooks';
import React, { useContext, useEffect, useState } from 'react';
import { Post } from '../../api';
import BBSLoading from '../BBSLoading';
import NormalPost from '../NormalPost/NormalPost';
import noComments from '@/assets/bbs/noComments.png';

export type ListProps<T> = {
  /**
   * 如果 requestFn 变更，则组件会刷新，分页从1开始
   */
  requestFn: (page: number) => Promise<{ data: T }>;
  isInnerPrimaryColorUsed?: boolean;
  isSquareLinkDisabled?: boolean;
};

type List<T = { threads: Post[] }> = React.FC<ListProps<T>>;

const List: List = ({
  requestFn,
  isInnerPrimaryColorUsed = true,
  isSquareLinkDisabled = false,
}) => {
  const [trigger, { toggle: refresh }] = useToggle(); // 用来触发刷新
  useUpdateEffect(() => {
    setPage(1);
    refresh();
    setIsStopLoadMore(false);
  }, [requestFn]);

  const postEvent$ = useContext(PostEventContext);
  postEvent$?.useSubscription((strOrArray) => {
    let val, args;
    if (strOrArray instanceof Array) {
      val = strOrArray[0];
      args = strOrArray.slice(1);
    } else {
      val = strOrArray;
      args = [];
    }
    switch (val) {
      case 'success':
        setPage(1);
        refresh();
        setIsStopLoadMore(false);
        break;
      default:
        break;
    }
  });

  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isStopLoadMore, setIsStopLoadMore] = useState(false);
  useEffect(() => {
    if (!isStopLoadMore) {
      setLoading(true);
      requestFn(page)
        .then((res) => {
          if (res.success) {
            // 设置无限加载的停止条件
            if (!res.data.threads?.length) {
              setIsStopLoadMore(true);
            }

            if (page === 1) {
              setData(res.data.threads);
            } else {
              setData((data) => data.concat(res.data.threads));
            }
          }
        })
        .finally(() => setLoading(false));
    }
  }, [page, trigger, isStopLoadMore]); // useToggle

  const inViewport = useInViewport(() => document.querySelector('#bbs-last-one-post'));
  useUpdateEffect(() => {
    if (inViewport) {
      setPage((c) => c + 1);
    }
  }, [inViewport]);

  const [loading, setLoading] = useState(true);

  return (
    <>
      {data?.map((v, i) => (
        <NormalPost
          key={v.threadId}
          post={v}
          isInnerPrimaryColorUsed={isInnerPrimaryColorUsed}
          isSquareLinkDisabled={isSquareLinkDisabled}
          id={i === data.length - 1 ? 'bbs-last-one-post' : undefined}
        />
      ))}
      <div style={{ textAlign: 'center' }}>
        <BBSLoading loading={loading} />
      </div>
      {!loading && (!data || data?.length === 0) && (
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
          暂无内容
        </div>
      )}
    </>
  );
};

export default List;
