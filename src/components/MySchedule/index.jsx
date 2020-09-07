import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import downArrows from '@/assets/img/down.png';
import upArrows from '@/assets/img/up.png';

const data = [
  {
    time: '10:00-12:00',
    title: '领取优惠券页面视觉评审',
  },
  {
    time: '10:00-12:00',
    title: '领取优惠券页面视觉评审',
  },
  {
    time: '10:00-12:00',
    title: '领取优惠券页面视觉评审',
  },
  {
    time: '10:00-12:00',
    title: '领取优惠券页面视觉评审',
  },
]
const myDate = new Date();
const MySchedule = (props) => {
  const [weekArr, setWeekArr] = useState([])
  const [isShowMore, setIsShowMore] = useState(true)
  const [fullYearMonth, setfullYearMonth] = useState({
    fullYear: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    myDate: myDate.getDate(),
  })

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
      if (weekFirstDay.getDate() === fullYearMonth.myDate) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
      item.day = weekFirstDay.getDate()
    })
    setWeekArr(week)
  };
  const showMoreSchedule = () => {
    setIsShowMore(!isShowMore)
  }
  const checkDate = (val) => {
    let dateArr = [...weekArr]
    dateArr.forEach((item, index) => {
      if (index === val) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
    })
    setWeekArr(dateArr)
  }

  return (
    <div className={styles.mySchedule}>
      <p className={styles.scheduleDate}>
        <span>我的日程</span>
        <span>{fullYearMonth.fullYear}年{fullYearMonth.month}月</span>
      </p>
      <div className={styles.calendar}>
        {
          weekArr && weekArr.map((item, index) => (
            <div key={index} className={styles.dayText} onClick={() => { checkDate(index) }}>
              <p>{item.title}</p>
              <p className={item.isCheck ? `${styles.day} ${styles.dayCheck}` : styles.day}>{item.day}</p>
            </div>
          ))
        }
      </div>
      <div className={styles.scheduleInfo}>
        <div className={styles.scheduleStatistics}>
          <p className={styles.totalData}>共<span>{data.length}</span>个日程</p>
          {
            data && data.length ? <p onClick={showMoreSchedule}>
              <img src={isShowMore ? downArrows : upArrows} alt="" />
            </p> : <></>
          }
        </div>
        {
          data && data.length ? data.map((item, index) => (
            <div className={styles.infoContent} key={index}>
              {
                (isShowMore ? index < 3 : data.length) ?
                  <p key={index}>
                    <span className={styles.dot}></span>
                    <span className={styles.time}>{item.time}</span>
                    <span>{item.title}</span>
                  </p> : <></>
              }

            </div>
          )) :
            <div className={styles.noData}>
              今天无日程
          </div>
        }
      </div>
    </div >
  );
};
export default MySchedule;
