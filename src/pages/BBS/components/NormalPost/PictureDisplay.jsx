import React, { useState } from 'react';
import { List } from 'antd';
import TestPic from '@/assets/bbs/test.png';
import LongPic from '@/assets/bbs/long.png';

const PictureDisplay = (props) => {
  return (
    <div style={{ ...props.detailStyle.displayBorder }}>
      <List
        grid={{ column: 3 }}
        dataSource={props.picList}
        renderItem={(item, index) => (
          <div style={{ marginBottom: '10px' }} key={index}>
            <img
              style={{ ...props.detailStyle.displayPic, cursor: 'zoom-in' }}
              src={item}
              onClick={() => {
                props.handlePicClick(index);
              }}
            />
          </div>
        )}
      ></List>
    </div>
  );
};

export default PictureDisplay;
