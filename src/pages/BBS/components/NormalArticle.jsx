import React, { useState, useEffect } from 'react';
import { Upload, Button, Avatar, Row, Col } from 'antd';
import {
  PlusOutlined,
  FundProjectionScreenOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';
import TestPic from '@/assets/bbs/test.png';
import LongPic from '@/assets/bbs/long.png';
import CommentIcon from '@/assets/bbs/comment.png';
import LikeBeforeIcon from '@/assets/bbs/like_before.png';
import styles from './style.less';

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
const NormalArticle = () => {
  const [viewed, setViewed] = useState(false);
  const [zoomedId, setZoomedId] = useState(-1);
  const [textHeight, setHeight] = useState(null);

  const hanclePicClick = (index) => {
    setZoomedId(index);
  };

  const getHeight = () => {
    let obj = document.getElementById('content');
    let height = obj.scrollHeight;
    setHeight(height);
  };

  useEffect(() => {
    getHeight();
  }, []);
  return (
    <div className={styles.article_container}>
      <div className={styles.article_header}>
        <Avatar size={50} icon={<img src={TestPic} />} />
        <div className={styles.left_header}>
          <p className={styles.header_name}>王佳佳</p>
          <p className={styles.header_time}>5小时前</p>
        </div>
        <div style={{ flex: 1 }} />
        <div className={styles.right_header}>
          <p>人事问题</p>
        </div>
      </div>
      <div className={styles.article_middle} style={{ margin: '5px 0 10px 62px' }}>
        <p className={styles.article_title}>帖子标题{zoomedId}</p>
        <p id="content" className={styles.article_content}>
          和福建安徽是肯定会付款了哈维空间规划不考啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          和福建安徽是肯定会付款了哈维空间规划不考啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊和福建安徽是肯定会付款了哈维空间规划不考啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          啊啊啊啊啊啊啊啊啊啊啊啊啊啊
        </p>
        {textHeight > 104 ? <a>查看全文</a> : null}
      </div>

      {zoomedId === -1 ? (
        <PictureDisplay picList={picList} hanclePicClick={hanclePicClick} />
      ) : (
        <PictureDetail picList={picList} zoomedId={zoomedId} hanclePicClick={hanclePicClick} />
      )}
      <div className={styles.article_bottom}>
        <span style={{ marginRight: '40px' }}>
          <img src={LikeBeforeIcon} />
          <span>赞</span>
          <span>118</span>
        </span>
        <span>
          <img src={CommentIcon} />
          <span>评论</span>
          <span>1000</span>
        </span>
      </div>
    </div>
  );
};

export default NormalArticle;
