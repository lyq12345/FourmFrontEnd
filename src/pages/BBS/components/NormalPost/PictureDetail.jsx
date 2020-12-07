import React, { useState, useEffect } from 'react';
import { List, Row, Col } from 'antd';
import TestPic from '@/assets/bbs/test.png';
import LongPic from '@/assets/bbs/long.png';
import { RightCircleOutlined, ZoomInOutlined, LeftCircleOutlined } from '@ant-design/icons';

const PictureDetail = (props) => {
  const [curZoomed, setCurZoomed] = useState(props.zoomedId);
  const [leftShow, setLeftShow] = useState(false);
  const [rightShow, setRightShow] = useState(false);


  const handleZoomOut = () => {
    props.handlePicClick(-1);
  };

  const handleNext = () => {
    if (curZoomed === props.picList.length - 1) {
      return;
    }
    setCurZoomed(curZoomed + 1);
  };

  const handlePrevious = () => {
    if (curZoomed === 0) {
      return;
    }
    setCurZoomed(curZoomed - 1);
  };

  const onLeftShow = () => {
    setLeftShow(true);
  };
  const onLeftUnshow = () => {
    setLeftShow(false);
  };
  const onRightShow = () => {
    setRightShow(true);
  };
  const onRightUnShow = () => {
    setRightShow(false);
  };
  const handleBottomClick = (index) => {
    setCurZoomed(index);
  };

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '20px 20px  12px 82px ' }}>
      <Row style={{ backgroundColor: '#333333' }}>
        <Row
          style={{
            background: `url(${props.picList[curZoomed].picUrl}) no-repeat center center / contain`,
            width: '568px',
            height: '568px',
          }}
        >
          <Col
            span={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              handlePrevious();
            }}
            onMouseOver={onLeftShow}
            onMouseOut={onLeftUnshow}
          >
            {curZoomed === 0 ? null : (
              <LeftCircleOutlined
                style={{
                  display: leftShow ? 'inline-block' : 'none',
                  fontSize: '42px',
                  color: '#FFFFFF',
                }}
              />
            )}
          </Col>
          <Col
            span={18}
            style={{ cursor: 'zoom-out' }}
            onClick={() => {
              handleZoomOut();
            }}
          ></Col>
          <Col
            span={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              handleNext();
            }}
            onMouseOver={onRightShow}
            onMouseOut={onRightUnShow}
          >
            {curZoomed === props.picList.length - 1 ? null : (
              <RightCircleOutlined
                style={{
                  display: rightShow ? 'inline-block' : 'none',
                  fontSize: '42px',
                  color: '#FFFFFF',
                }}
              />
            )}
          </Col>
        </Row>
      </Row>
      <Row gutter={2} justify="start" style={{ margin: '10px 0' }}>
        {props.picList.map((item, index) => (
          <Col>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                opacity: index === curZoomed ? '100%' : '51%',
              }}
            >
              <img
                onClick={() => {
                  handleBottomClick(index);
                }}
                src={item.picUrl}
                style={{
                  width: '58px',
                  height: '58px',
                  cursor: 'pointer',
                  border: index === curZoomed ? '1px solid #FF5000' : 'none',
                }}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PictureDetail;
