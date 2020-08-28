import React, { useState, useEffect } from 'react';
import styles from './styles.less';

const MySchedule = (props) => {
  const [weekArr, setWeekArr] = useState([])

  useEffect(() => {
    setDate();
  }, [])
  const setDate = () => {
    var now = new Date()
    const week = [
      { title: '日' },
      { title: '一' },
      { title: '二' },
      { title: '三' },
      { title: '四' },
      { title: '五' },
      { title: '六' }
    ]
    week.map((item, key) => {
      var weekFirstDay = new Date(now - (now.getDay() - key) * 86400000)
      item.day = weekFirstDay.getDate()
    })
    setWeekArr(week)
  };
  return (
    <div className={styles.mySchedule}>
      <p className={styles.scheduleDate}>
        <span>我的日程</span>
        <span>2020年8月</span>
      </p>
      <div className={styles.calendar}>
        {
          weekArr && weekArr.map((item, index) => (
            <div key={index} className={styles.dayText}>
              <p>{item.title}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default MySchedule;
