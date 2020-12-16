import React from 'react';
import styles from './styles.less';
import lookmoreBtn from '@/assets/img/lookmore-btn.png';
import Cookies from 'js-cookie';

const Card = (props) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  let { title, noPadding, bottomLookMore, dataList, titlePaperwork, moreUrl } = props
  const accessToken = Cookies.get('access_token');
  const handleLink = (val) => {
    const w = window.open('about:blank');
    // 我的祝福墙
    if (val.classTypeId == '400000099') {
      w.location.href = `birthday-wish/myReceiveWish?wishType=${2}&userId=${userInfo && userInfo.account}&type=${2}`
      return
    }
    // ta的祝福墙
    if (val.classTypeId == '400000100') {
      w.location.href = `birthday-wish/BlessingWall?wishType=${2}&userId=${userInfo && userInfo.account}&type=${1}&avater=${val.avater}`
      return
    }
    w.location.href = val.href
  }
  return (
    <div className={`${styles.card} ${noPadding ? styles.noPadding : ''}`}>
      {
        !title ? <div className={styles.cardTitle} >
          <p className={styles.titleName}>{titlePaperwork}</p>
          <p className={styles.lookMore} onClick={() => window.open(`${moreUrl}&token=${accessToken}`)}>更多</p>
        </div> : <></>
      }
      {dataList && dataList.length &&
        dataList.map((item, index) => (
          <div className={styles.contentInfo} key={index} onClick={() => handleLink(item)}>
            <p className={styles.contentTitle} title={titlePaperwork ? item.title : item.fullTitle}>
              <span className={styles.dot}></span>
              <span className={styles.title}>{
                titlePaperwork ? item.title : item.fullTitle
              }
              </span>

            </p>
            <p className={styles.contentDate}>{item.time}</p>
          </div>
        ))}
      {
        bottomLookMore ? <div className={styles.bottomLookMore}>
          <span onClick={() => window.open(`${moreUrl}&token=${accessToken}`)}>查看更多</span>
          <img src={lookmoreBtn} alt="" />
        </div> : <></>
      }
    </div>
  );
};
export default Card;
