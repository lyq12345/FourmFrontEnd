import React, { useState } from 'react';
import PictureDetail from './PictureDetail';
import PictureDisplay from './PictureDisplay';

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
  displayBorder: { width: '450px', margin: '12px 0 0 74px' },
  zoomedUpperPic: { width: picSize['normalBig'], height: picSize['normalBig'] },
  zoomedBorder: { padding: '20px 20px  12px 74px', margin: '0 0 10px 0' },
  zoomedBottomPic: { width: picSize['normalOther'], height: picSize['normalOther'] },
  zoomedBottomGutter: 5,
};

const detailStyle = {
  displayPic: { width: picSize['detailSmall'], height: picSize['detailSmall'] },
  displayBorder: { width: '630px', margin: '12px 0 10px 0px' },
  zoomedUpperPic: { width: picSize['detailBig'], height: picSize['detailBig'] },
  zoomedBorder: { padding: '20px 20px  12px 32px', margin: '0 0 10px 0' },
  zoomedBottomPic: { width: picSize['detailOther'], height: picSize['detailOther'] },
  zoomedBottomGutter: 5,
};

const typedStyles = [normalStyle, detailStyle];

const PicturePart = ({ type = 0, picList, largePicList }) => {
  if (!largePicList || !largePicList.length) {
    largePicList = picList;
  }
  if (!picList || !picList.length) {
    return null;
  }
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
