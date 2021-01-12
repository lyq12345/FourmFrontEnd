import iconMobile from '@/assets/bbs/icon/mobile.png';
import iconPhone from '@/assets/bbs/icon/phone.png';
import logoNfsq from '@/assets/bbs/logo/logo_nfsq.png';
import logoWantai from '@/assets/bbs/logo/logo_wantai.png';
import logoYoseido from '@/assets/bbs/logo/logo_yoseido.png';
import logoYst from '@/assets/bbs/logo/logo_yst.png';
import React from 'react';
import styles from './Footer.less';

const Footer: React.FC = React.memo(() => {
  return (
    <div style={{ background: 'white' }} className={styles.footer} id="bbs-footer">
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <div className={styles.textContainer}>
            <p>养生堂集团有限公司</p>
            <p>
              养生堂有限公司 | 农夫山泉股份有限公司 | 养生堂浙江食品有限公司 | 养生堂化妆品有限公司
              |
            </p>
            <p>北京万泰生物药业股份有限公司</p>
          </div>
        </div>
        <div className={styles.topRight}>
          <div className={styles.textContainerRight}>
            <p className={styles.item}>IT服务台：</p>
            <p className={styles.item}>
              <img src={iconPhone} alt="phone" />
              <span className={styles.phone}>0571-87663116</span>
              <span className={styles.day}>工作日</span>
            </p>
            <p className={styles.item}>
              <img src={iconMobile} alt="mobile" />
              <span className={styles.phone}>18072772789</span>
              <span className={styles.day}>节假日</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBg}>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <img src={logoYst} alt="logoYst" />
            <img src={logoNfsq} alt="logoNfsq" />
            <img src={logoYoseido} alt="logoYoseido" />
            <img src={logoWantai} alt="logoWantai" />
          </div>
          <div className={styles.bottomRight}>All Rights Reserved.浙ICP备10201315号-3</div>
        </div>
      </div>
    </div>
  );
});

export default Footer;
