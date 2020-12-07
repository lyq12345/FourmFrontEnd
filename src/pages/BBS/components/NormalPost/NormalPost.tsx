import { IconFont } from '@/utils/utilsBBS';
import { Avatar } from 'antd';
import React, { useState } from 'react';
import { Post } from '../../api';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';
import { Link } from 'umi';

import { dayjs } from '@/utils/utilsBBS';

import styles from './NormalPost.less';
import TestPic from '@/assets/bbs/test.png';
import LongPic from '@/assets/bbs/long.png';

const picList = [
  {
    picUrl: TestPic,
  },
  {
    picUrl: LongPic,
  },
  {
    picUrl: TestPic,
  },
  {
    picUrl: LongPic,
  },
  {
    picUrl: TestPic,
  },
  {
    picUrl: TestPic,
  },
  {
    picUrl: TestPic,
  },
  {
    picUrl: TestPic,
  },
  {
    picUrl: TestPic,
  },
];

export default React.memo<{ post: Post }>(({ post }) => {
  // 图片展示
  const [zoomedId, setZoomedId] = useState(-1);

  const handlePicClick = (index) => {
    setZoomedId(index);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <Avatar size={50} src={post.avatarPath} className={styles['avatar']} />
        <div className={styles['center']}>
          <p className={styles['author']}>{post.createName}</p>
          <p className={styles['time']}>{dayjs(post.createDate).fromNow()}</p>
          <div className={styles['hot-area']}>
            <p className={styles['title']}>{post.title}</p>
            <p className={styles['content']}>
              {post.content.length > 60 ? (
                <>
                  {post.content.slice(60) + '...'}{' '}
                  <Link to={'/bbs/post/' + post.threadId}>查看全文</Link>
                </>
              ) : (
                post.content
              )}
            </p>
          </div>
        </div>
      </div>

      {picList.length ? (
        zoomedId === -1 ? (
          <PictureDisplay picList={picList} handlePicClick={handlePicClick} />
        ) : (
          <PictureDetail picList={picList} zoomedId={zoomedId} handlePicClick={handlePicClick} />
        )
      ) : null}

      <div className={styles['action']}>
        <IconFont type="iconzan" className={styles['bottom-icon']} />
        <span className={styles['type']}>赞</span>
        <span>{post.loveCount}</span>
        <IconFont type="iconpinglun" className={styles['bottom-icon']} />
        <span className={styles['type']}>评论</span>
        <span>{post.replyCount}</span>
      </div>
    </div>
  );
});
