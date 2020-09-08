import React, { useState, useEffect } from 'react';
import styles from './styles.less';
// import downArrows from '@/assets/img/colour-bar.png';
// import upArrows from '@/assets/img/up.png';

const birthdayArrList = [
  {
    name: '陈慎建今天入职1周年',
  },
  {
    name: '陈慎建今天入职1周年',
  },
  {
    name: '陈慎建今天入职1周年',
  },
]
const Birthday = (props) => {
  useEffect(() => {
  }, [])
  return (
    <div className={styles.birthday}>
      <div className={styles.birthdayAnniversary}>
        <span>生日周年庆</span>
        <span>更多</span>
      </div>
      <div>
        {
          birthdayArrList && birthdayArrList.map((item, index) => (
            <div className={styles.birthdayNameList} key={index}>
              <div>
                <p className={styles.birthdayContent}>
                  <span></span>
                  <span className={styles.name}>{item.name}</span>
                </p>
                <p><a href=''>送祝福</a></p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default Birthday;
