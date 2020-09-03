import React, { useState, useEffect } from 'react';
import styles from './style.less';
import Bullets from './components/Bullets';
import RankingList from './components/RankingList';

const Index = () => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <h2>
        <span>堂果币排行榜</span>
      </h2>
      <Bullets />
      <RankingList />
    </div>
  );
};

export default Index;
