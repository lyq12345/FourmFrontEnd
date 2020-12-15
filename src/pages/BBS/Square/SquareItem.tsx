import React, { useCallback, useState } from 'react';
import { useParams } from 'umi';
import { PostTypeDetail, requestTypePosts } from '../api';
import BBSLoading from '../components/BBSLoading';
import NormalPostList from '../components/NormalPostList';
import styles from './SquareItem.less';

const SquareItem: React.FC = React.memo(() => {
  const { squareId } = useParams();
  const [data, setData] = useState<PostTypeDetail>({} as PostTypeDetail);
  const [loading, setLoading] = useState(true);

  const requestFn = useCallback(
    (page) => {
      setLoading(true);
      return requestTypePosts(page, squareId)
        .then((res) => {
          if (res.success) {
            setData(res.data);
          }
          return res;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [squareId],
  );

  return (
    <BBSLoading loading={loading}>
      <div className={styles['square-title']} style={{ background: data.color }}>
        <span>{data.forumName}</span>
        <span>{`${data.total}篇内容 · ${data.readCount}次浏览`}</span>
        <span>{data.description}</span>
      </div>
      <NormalPostList requestFn={requestFn} />
    </BBSLoading>
  );
});

export default SquareItem;
