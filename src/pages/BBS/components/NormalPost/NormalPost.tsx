import { IconFont } from '@/utils/utilsBBS';
import { Avatar } from 'antd';
import React, { useState } from 'react';

import { Post } from '../api';

import styles from './NormalPost.less';
import TestPic from '@/assets/bbs/test.png';
import LongPic from '@/assets/bbs/long.png';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';
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
        <Avatar
          size={50}
          icon={
            <img
              src={
                'https://cdn1.oneprofile.page/pages/avatars/323/large/Danielle_Darren-2019-255-500x500.jpg?1593718847'
              }
              alt="avatar"
            />
          }
          className={styles['avatar']}
        />
        <div className={styles['center']}>
          <p className={styles['author']}>李小帅</p>
          <p className={styles['time']}>5分钟前</p>
          <div className={styles['hot-area']}>
            <p className={styles['title']}>给大家送福利啦！昆曲演出门票免费申领~~</p>
            <p className={styles['content']}>
              本周三（9月16日）晚上及本周五（9月18日）晚上，在杭州剧院各有一场经典昆曲演出。为了给堂里人谋福利，每场演出各有50张门票免费送！~~
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
        <span>123123</span>
        <IconFont type="iconpinglun" className={styles['bottom-icon']} />
        <span className={styles['type']}>评论</span>
        <span>4124</span>
      </div>
    </div>
  );
});
