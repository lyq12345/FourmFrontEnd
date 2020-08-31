import React from 'react';
import styles from './styles.less';
import lookmoreBtn from '@/assets/img/lookmore-btn.png';

const Card = (props) => {
  const testData = [
    { title: '经销商服务经理（化妆品）', date: '07.31' },
    { title: '经销商服务经理（化妆品）', date: '07.31' },
    { title: '经销商服务经理（化妆品）', date: '07.31' },
  ];
  let { title, noPadding, bottomLookMore } = props
  return (
    <div className={`${styles.card} ${noPadding ? styles.noPadding : ''}`}>
      {
        !title ? <div className={styles.cardTitle} >
          <p className={styles.titleName}>公告通知</p>
          <p className={styles.lookMore}>更多</p>
        </div> : <></>
      }
      {testData.length &&
        testData.map((item, index) => (
          <div className={styles.contentInfo} key={index}>

            <p className={styles.contentTitle}>
              <span className={styles.dot}></span>
              {item.title}
            </p>
            <p className={styles.contentDate}>{item.date}</p>
          </div>
        ))}
      {
        bottomLookMore ? <div className={styles.bottomLookMore}>
          <span>查看更多</span>
          <img src={lookmoreBtn} alt="" />
        </div> : <></>
      }
    </div>
  );
};
export default Card;
