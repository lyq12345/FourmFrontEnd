import React, { useState } from 'react';
import PictureDisplay from './PictureDisplay';
import PictureDetail from './PictureDetail';

const PicturePart = (props) => {
  const [zoomedId, setZoomed] = useState(-1);
  const [picList, setPicList] = useState(props.picList);

  const handlePicClick = (index) => {
    setZoomed(index);
  };

  return (
    <div>
      {zoomedId === -1 ? (
        <PictureDisplay picList={picList} handlePicClick={handlePicClick} />
      ) : (
        <PictureDetail picList={picList} zoomedId={zoomedId} handlePicClick={handlePicClick} />
      )}
    </div>
  );
};

export default PicturePart;
