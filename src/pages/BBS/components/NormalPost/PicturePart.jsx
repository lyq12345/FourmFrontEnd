import React, { useState } from 'react';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';

import TestPic from '@/assets/bbs/test.png';
import LongPic from '@/assets/bbs/long.png';
const picList1 = [
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
const largePicList1 = [
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

const picSize = {
  normalSmall: '140px',
  normalBig: '568px',
  normalOther: '58px',
  detailSmall: '202px',
  detailBig: '568px',
  detailOther: '58px',
};

const normalStyle = {
  displayPic: { width: picSize['normalSmall'], height: picSize['normalSmall'] },
  zoomedUpperPic: { width: picSize['normalBig'], height: picSize['normalBig'] },
  zoomedUpperPaddings: { padding: '20px 20px  12px 82px' },
  zoomedBottomPic: { width: picSize['normalOther'], height: picSize['normalOther'] },
  zoomedBottomGutter: 5,
};

const detailStyle = {
  displayPic: { width: picSize['detailSmall'], height: picSize['detailSmall'] },
  zoomedUpperPic: { width: picSize['detailBig'], height: picSize['detailBig'] },
  zoomedUpperPaddings: { padding: '20px 20px  12px 82px' },
  zoomedBottomPic: { width: picSize['detailOther'], height: picSize['detailOther'] },
  zoomedBottomGutter: 5,
};

const typedStyles = [normalStyle, detailStyle];

const PicturePart = ({ type = 0, picList = picList1, largePicList = largePicList1 }) => {
  const [zoomedId, setZoomed] = useState(-1);

  const handlePicClick = (index) => {
    setZoomed(index);
  };

  return (
    <div>
      {zoomedId === -1 ? (
        <PictureDisplay
          picList={picList}
          handlePicClick={handlePicClick}
          detailStyle={typedStyles[type]}
        />
      ) : (
        <PictureDetail
          picList={largePicList}
          zoomedId={zoomedId}
          handlePicClick={handlePicClick}
          detailStyle={typedStyles[type]}
        />
      )}
    </div>
  );
};

export default PicturePart;
