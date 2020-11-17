import React, { useState } from 'react';
import { Upload, Button, Avatar } from 'antd';
import { PlusOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';
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
const NormalArticle = () => {
  const [viewed, setViewed] = useState(false);
  const [zoomedId, setZoomedId] = useState(-1);

  const hanclePicClick = (index) => {
    setZoomedId(index);
  };

  return (
    <div style={{ width: '670px', backgroundColor: '#fff' }}>
      <div>
        <Avatar size={50} icon={<img src={TestPic} />} />
      </div>
      <div>帖子标题{zoomedId}</div>
      {zoomedId === -1 ? (
        <PictureDisplay picList={picList} hanclePicClick={hanclePicClick} />
      ) : (
        <PictureDetail picList={picList} zoomedId={zoomedId} hanclePicClick={hanclePicClick} />
      )}
      <div>点赞评论</div>
    </div>
  );
};

export default NormalArticle;
