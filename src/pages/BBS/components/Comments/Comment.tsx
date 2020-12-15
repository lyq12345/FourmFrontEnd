import { dayjs, IconFont, useDebounceFn } from '@/utils/utilsBBS';
import { Avatar } from 'antd';
import React, { useState } from 'react';
import { Comment } from '../../api';
import styles from './Comment.less';

export type CommentProps = {
  onGoodClick: (status: 0 | 1, postId: number) => Promise<{ status: 0 | 1; loveCount: number }>;
  onCommentClick: (comment: Comment) => void;
  comment: Comment;
  hasDivider?: boolean;
};

export default React.memo<CommentProps>(
  ({ comment, onCommentClick, onGoodClick, hasDivider = true }) => {
    const [loveCount, setLoveCount] = useState(comment.loveCount);
    const [isLove, setIsLove] = useState(comment.isLove);

    const { run: handleGoodClick } = useDebounceFn(() => {
      onGoodClick(1 - isLove, +comment.postId)
        ?.then((res) => {
          setLoveCount(res.loveCount);
          setIsLove(res.status);
        })
        .catch();
    });

    return (
      <div className={styles['comment']}>
        <span>{comment.floorNumber}楼</span>
        <Avatar size={24} src={comment.avatarPath} style={{ verticalAlign: 'top' }} />
        <div className={styles['right']}>
          <p>{comment.createName}</p>
          <p>{dayjs(comment.createDate).format('MM月DD日')}</p>
          <p>{comment.content}</p>
          {comment.contentparent && <p>{comment.contentparent}</p>}

          <div className={styles['action']}>
            {isLove ? (
              <span onClick={handleGoodClick}>
                <IconFont type="iconyizan" className={styles['good-on']} />
                <span className={`${styles['count']} ${styles['good-on']}`}>{loveCount}</span>
              </span>
            ) : (
              <span onClick={handleGoodClick}>
                <IconFont type="iconzan" className={styles['good-off']} />
                <span className={`${styles['count']} ${styles['good-off']}`}>{loveCount}</span>
              </span>
            )}
            <IconFont
              type="iconpinglun"
              onClick={(e) => {
                onCommentClick(comment);
                e.stopPropagation();
              }}
            />
          </div>

          {hasDivider && <div className={styles['divider']} />}
        </div>
      </div>
    );
  },
);
