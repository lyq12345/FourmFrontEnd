import React, { useState, useEffect } from 'react';
import styles from './style.less';
import RankingList from './components/RankingList';
import Bullets from './components/Bullets';

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
      <Bullets bulSetting={{ overflow: 'hidden' }} />
      <RankingList />
    </div>
  );
};

export default Index;
