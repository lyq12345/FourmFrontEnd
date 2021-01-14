import React from 'react';
import Top10Item from './Top10Item';

const Top10 = (props) => {
  return (
    <div style={{ backgroundColor: '#FAFAFA', padding: '0 -10px', textAlign: 'left' }}>
      {props.content.map((item) => (
        <Top10Item content={item} year={props.year} month={props.month}/>
      ))}
    </div>
  );
};

export default Top10;
