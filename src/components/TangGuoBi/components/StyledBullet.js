/*
 * @Author: your name
 * @Date: 2020-09-08 16:57:32
 * @LastEditTime: 2020-09-08 17:23:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/components/TangGuoBi/components/StyledBullet.js
 */
import React from 'react';

const WrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5em 1em',
  borderRadius: '2.2em',
  position: 'relative',
  wordBreak: 'keep-all',
  whiteSpace: 'pre-wrap',
};
const MsgStyle = {
  display: 'inline-block',
  padding: '0 10px',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '17px',
  maxWidth: '300px',
  overflow: 'hidden',
};
const HeadStyle = {
  //position: 'absolute',
  //left: '-4.6em',
  //top: '50%',
  display: 'inline-block',
  //transform: 'translateY(-50%)',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  // boxShadow: '0 0 .8em rgba(0, 0, 0, 0.8)',
};
const ImageStyle = {
  borderRadius: '50%',
  width: '100%',
  height: '100%',
};
const sizes = {
  small: '10px',
  normal: '12px',
  large: '14px',
  huge: '16px',
};
const StyledBullet = ({ msg, head, size = 'normal', color, backgroundColor = '#fff' }) => {
  color = color || '#aaa';
  const fontSize = sizes[size] || size;
  return (
    <div style={{ ...WrapperStyle, backgroundColor, fontSize }}>
      {head && (
        <div style={{ ...HeadStyle }}>
          <img src={head} style={ImageStyle} alt="msg head" />
        </div>
      )}
      <div style={{ ...MsgStyle, color }}>{msg}</div>
    </div>
  );
};
export default StyledBullet;
