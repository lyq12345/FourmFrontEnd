import React from 'react';
import styles from './styles.less';

const Card = (props) => {
  const testData = [
    { title: '· 经销商服务经理（化妆品）', date: '07.31' },
    { title: '· 经销商服务经理（化妆品）', date: '07.31' },
    { title: '· 经销商服务经理（化妆品）', date: '07.31' },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <p className={styles.titleName}>公告通知</p>
        <p className={styles.lookMore}>更多</p>
      </div>
      {testData.length &&
        testData.map((item, index) => (
          <div className={styles.contentInfo} key={index}>
            <p className={styles.contentTitle}>{item.title}</p>
            <p className={styles.contentDate}>{item.date}</p>
          </div>
        ))}
    </div>
  );
};
export default Card;
