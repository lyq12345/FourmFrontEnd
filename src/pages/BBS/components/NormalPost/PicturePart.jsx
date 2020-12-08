import React, { useState } from 'react';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';

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

const PicturePart = (props) => {
  const type = props.type || 0;
  const [zoomedId, setZoomed] = useState(-1);
  const [picList, setPicList] = useState(props.picList);
  const [largePicList, setLargeList] = useState(props.largePicList);

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
