import React from 'react';
import styles from './Footer.less';

const Footer: React.FC = React.memo(() => {
  return (
    <div style={{ background: 'white' }} className={styles.footer}>
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
            <p>IT服务台：</p>
            <p>IT服务台：</p>
            <p>IT服务台：</p>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: '#d8d8d8' }}></div>

      <div className={styles.bg}>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}></div>
          <div className={styles.bottomRight}>All Rights Reserved.浙ICP备10201315号-3</div>
        </div>
      </div>
    </div>
  );
});

export default Footer;
