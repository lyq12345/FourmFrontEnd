import { IconFont } from '@/utils/utilsBBS';
import { useClickAway } from 'ahooks';
import { Avatar, Button, Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Comment, requestCommentLove, requestComments } from '../../api';
import CommentComponent, { CommentProps } from './Comment';

import styles from './style.less';

export default React.memo<{ id: number }>(({ id }) => {
  const [data, setData] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    requestComments(id, page).then((res) => {
      if (page === 1) {
        setData(res.data.posts);
      } else {
        setData((c) => c.concat(res.data.posts));
      }
    });
  }, [page]);

  const handleGoodClick: CommentProps['onGoodClick'] = useCallback(
    (status: 0 | 1, postId: number) => {
      return new Promise<{ status: 0 | 1; loveCount: number }>((resolve, reject) => {
        requestCommentLove(status, postId)
          .then((res) => {
            resolve({ status, loveCount: +res.data });
          })
          .catch((e) => reject(e));
      });
    },
    [],
  );

  const handleCommentClick: CommentProps['onCommentClick'] = useCallback((comment) => {
    setTargetComment(comment);
  }, []);
  // 默认回复原帖
  const [targetComment, setTargetComment] = useState<Comment | null>(null);
  // 点击其它地方恢复回复原帖
  const handleBgClick = useCallback(() => {
    setTargetComment(null);
  }, []);
  const handleReplyBgClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const commentsRef = useRef(null);
  useClickAway(() => {
    setTargetComment(null);
  }, commentsRef);

  const [value, setValue] = useState('');
  const handleValueChange = useCallback((v) => {
    setValue(v.target.value);
  }, []);
  const handleSubmit = useCallback((e) => {
    console.log('target', targetComment);
    // TODO:
  }, []);

  return (
    <div className={styles['comments']} onClick={handleBgClick} ref={commentsRef}>
      <p className={styles['title']}>共{data.length}条评论</p>
      <div className={styles['comment-container']}>
        {data.map((v) => (
          <CommentComponent
            key={v.postId}
            comment={v}
            onGoodClick={handleGoodClick}
            onCommentClick={handleCommentClick}
          />
        ))}
      </div>
      <div className={styles['reply']} onClick={handleReplyBgClick}>
        <Input
          className={styles['input']}
          placeholder={!targetComment ? '回复帖子' : `回复${targetComment.floorNumber}楼`}
          value={value}
          onChange={handleValueChange}
        />
        <Button className={styles['submit']} onClick={handleSubmit}>
          发送
        </Button>
      </div>
    </div>
  );
});
