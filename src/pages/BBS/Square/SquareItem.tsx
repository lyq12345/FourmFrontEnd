import React, { useState } from 'react';
import { useParams } from 'umi';
import { requestTypePosts } from '../api';
import NormalPostList from '../components/NormalPostList';
import styles from './SquareItem.less';

const SquareItem: React.FC = React.memo(() => {
  const { squareId } = useParams();
  const [data, setData] = useState({});

  return (
    <div>
      <div className={styles['square-title']}>
        <span>{data.forumName}</span>
        <span>
          {data.total}篇内容 · {data.readCount}次浏览
        </span>
        <span>{data.description}</span>
      </div>
      <NormalPostList
        requestFn={(page) =>
          requestTypePosts(page, squareId).then((res) => {
            setData(res.data);
            return res;
          })
        }
      />
    </div>
  );
});

export default SquareItem;
