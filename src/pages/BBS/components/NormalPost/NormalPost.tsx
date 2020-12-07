import { IconFont } from '@/utils/utilsBBS';
import { Avatar } from 'antd';
import React from 'react';
import { Post } from '../../api';
import PicturePart from './PicturePart';
import { Link } from 'umi';

import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
var config = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
};
require('dayjs/locale/zh-cn');
dayjs.extend(relativeTime, config).locale('zh-cn');

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

      {picList.length ? <PicturePart picList={picList} /> : null}

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
