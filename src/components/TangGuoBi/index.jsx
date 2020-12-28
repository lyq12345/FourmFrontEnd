import React, { useState, useEffect } from 'react';
import styles from './style.less';
import RankingList from './components/RankingList';
import Bullets from './components/BulletBase';
import { getPersonInfo } from '@/api/tangguobi';

const Index = () => {
  const [personInfo, setPersonInfo] = useState({});
  useEffect(() => {
    const { personCode } = JSON.parse(localStorage.getItem('userInfo'));
    getPersonInfo({ personCode }).then(({ data }) => {
      setPersonInfo(data);
    });
  }, []);
  return (
    <div className={styles.tgbContainer}>
      <div className={styles.navHead}>
        <span className={styles.title}>堂果币排行榜</span>
        <span className={styles.comName}>{personInfo.comName}</span>
        <div style={{ flex: 1 }}></div>
        <a href="tangguobi-rank" target="_blank" className={styles.tgbmore}>
          更多
        </a>
      </div>
      <Bullets bulSetting={{ overflow: 'hidden' }} type={1} />
      <RankingList />
    </div>
  );
};

export default Index;
