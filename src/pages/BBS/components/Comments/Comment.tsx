import { IconFont } from '@/utils/utilsBBS';
import { Avatar } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Comment, requestComments } from '../../api';
import styles from './Comment.less';
import dayjs from 'dayjs';
require('dayjs/locale/zh-cn');
dayjs.locale('zh-cn');

export type CommentProps = {
  onGoodClick: (status: 0 | 1, postId: number) => Promise<{ status: 0 | 1; loveCount: number }>;
  onCommentClick: (comment: Comment) => void;
  comment: Comment;
};

export default React.memo<CommentProps>(({ comment, onCommentClick, onGoodClick }) => {
  const [loveCount, setLoveCount] = useState(comment.loveCount);
  const [isLove, setIsLove] = useState(comment.isLove);

  const handleGoodClick = useCallback(() => {
    onGoodClick(1 - isLove, +comment.postId).then((res) => {
      setLoveCount(res.loveCount);
      setIsLove(res.status);
    });
  }, [isLove]);

  return (
    <div className={styles['comment']}>
      <span>{comment.floorNumber}</span>
      <Avatar size={24} src={comment.avatarPath} style={{ verticalAlign: 'top' }} />
      <div className={styles['right']}>
        <p>{comment.createName}</p>
        <p>{dayjs(comment.createDate).format('MM月DD日')}</p>
        <p>
          不要让任何人告诉你，你不行，即便我也一样。想要什么，就努力去追求，有一个梦想，就努力捍卫。
          不要让任何人告诉你，你不行，即便我也一样。想要什么，就努力去追求，有一个梦想，就努力捍卫。
        </p>

        <p>
          不要让任何人告诉你，你不行，即便我也一样。想要什么，就努力去追求，有一个梦想，就努力捍卫。
          不要让任何人告诉你，你不行，即便我也一样。想要什么，就努力去追求，有一个梦想，就努力捍卫。
        </p>

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
            style={{ marginLeft: 25 }}
            onClick={(e) => {
              onCommentClick(comment);
              e.stopPropagation();
            }}
          />
        </div>

        <div className={styles['divider']} />
      </div>
    </div>
  );
});
