/*
 * @Author: your name
 * @Date: 2020-09-08 16:57:32
 * @LastEditTime: 2020-09-11 11:12:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/components/TangGuoBi/components/StyledBullet.js
 */
import React from 'react';

const WrapperStyle = {
  display: 'flex',
  height: '30px',
  alignItems: 'center',
  borderRadius: '20px',
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
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
const HeadStyle = {
  display: 'inline-block',
  width: '24px',
  height: '24px',
  marginLeft: '3px',
  borderRadius: '50%',
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
const StyledBullet = ({
  msg,
  reason,
  head,
  valuesType,
  size = 'normal',
  color,
  backgroundColor = '#fff',
}) => {
  color = color || '#aaa';
  const fontSize = sizes[size] || size;
  return (
    <div style={{ ...WrapperStyle, backgroundColor, fontSize }}>
      {head && (
        <div style={{ ...HeadStyle }}>
          <img src={head} style={ImageStyle} alt="msg head" />
        </div>
      )}
      <div style={{ display: 'inline-block', padding: '0 10px', color }}>
        <span
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            fontSize: '12px',
            fontWeight: '400',
            color,
          }}
        >
          {msg}
        </span>
        <span
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            fontSize: '12px',
            fontWeight: '500',
            color,
          }}
        >
          {valuesType}
        </span>
        <span
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            fontWeight: '400',
            maxWidth: '15em',
            overflow: 'hidden',
            textOverflow: 'hidden',
            color,
            verticalAlign: 'middle',
          }}
        >
          {reason}
        </span>
      </div>
    </div>
  );
};
export default StyledBullet;
