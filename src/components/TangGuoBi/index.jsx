import React, { useState, useEffect } from 'react';
import styles from './style.less';
import Bullets from './components/Bullets';
import RankingList from './components/RankingList';

const Index = () => {
  return (
    <div className={styles.tgbContainer}>
      <div className={styles.navHead}>
        <span className={styles.title}>堂果币排行榜</span>
        <div style={{ flex: 1 }}></div>
        <a href="./tangguobi-rank" className={styles.tgbmore}>
          更多
        </a>
      </div>
      <Bullets bulSetting={{ marginLeft: '250px', marginRight: '250px' }} />
      <RankingList />
    </div>
  );
};

export default Index;
