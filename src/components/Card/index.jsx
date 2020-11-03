import React from 'react';
import styles from './styles.less';
import lookmoreBtn from '@/assets/img/lookmore-btn.png';

const Card = (props) => {
  let { title, noPadding, bottomLookMore, dataList, titlePaperwork } = props
  const handleLink = (val) => {
    const w = window.open('about:blank');
    w.location.href = val.href
  }
  return (
    <div className={`${styles.card} ${noPadding ? styles.noPadding : ''}`}>
      {
        !title ? <div className={styles.cardTitle} >
          <p className={styles.titleName}>{titlePaperwork}</p>
          <p className={styles.lookMore}>更多</p>
        </div> : <></>
      }
      {dataList && dataList.length &&
        dataList.map((item, index) => (
          <div className={styles.contentInfo} key={index} onClick={() => handleLink(item)}>
            <p className={styles.contentTitle}>
              <span className={styles.dot}></span>
              {
                titlePaperwork ? item.title : item.fullTitle
              }

            </p>
            <p className={styles.contentDate}>{item.time}</p>
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
