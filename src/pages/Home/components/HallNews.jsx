import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Card, Carousel, Popover, Badge, Spin, Divider } from 'antd';
import { useHover } from 'ahooks';
import toDoTasksImg from '@/assets/img/To-do-tasks.png';
import unreadMessages from '@/assets/img/Unread-messages.png';
import hallWords from '@/assets/img/Hall-words.png';
import HallPeople from '@/assets/img/HallPeople.png';
import waterHealth from '@/assets/img/waterHealth.png';
import CardComponent from '@/components/Card';
import playImg from '@/assets/img/play.png';
import styles from '../style.less';
// import { carouselList } from '@/constants/mock';
import { withRouter } from 'umi';
import { GetUserTip, GetPortalTip, GetAffairIndex, GetAffairPersonIndex, GetTask, GetMessage } from '@/api/common'
import SwiperCore, { Autoplay } from 'swiper';

import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperComponent from '@/components/Swiper/Swiperv'
import Cookies from 'js-cookie';

SwiperCore.use([Autoplay]);

const HallNews = (props) => {
  const [yearWeek, setYearWeek] = useState(null);
  const [carouselCurrent, setCarouselCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [topVideo, setTopVideo] = useState({});
  // const swiperRef = useRef()
  const [spinning, setSpinning] = useState(true)
  const [entryTime, setEntryTime] = useState(null)
  const [hallWordsText, setHallWordsText] = useState(null)
  const [unreadMessagesNum, setUnreadMessagesNum] = useState(null)
  const [toDoTasksNum, setToDoTasksNum] = useState(null)
  const [carouselList, setCarouselList] = useState([])
  const [unreadInfoList, setUnreadInfoList] = useState({})
  const [toDoTasksList, setToDoTasksNumList] = useState({})
  const [WeeklyChapelInfo, setWeeklyChapelInfo] = useState({})
  const [isToDoTasksVisible, setIsToDoTasksVisible] = useState(false)
  const [isUnreadVisible, setIsUnreadVisible] = useState(false)
  const [swiper, setSwiper] = useState(null);
  // 自动停止轮播
  const ref = React.useRef();
  const isHovering = useHover(ref);
  const [isPlaying, setIsPlaying] = useState(false);
  const accessToken = Cookies.get('access_token');
  useEffect(() => {
    const myDate = new Date();
    const fullYear = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    setYearWeek(getYearWeek(fullYear, month, day));

    const info = () => {
      // 获取入职时间
      GetUserTip({}).then(response => {
        if (response.success) {
          setEntryTime(response.data)
        }
      })
      // 获取堂里话
      GetPortalTip({}).then(response => {
        if (response.success) {
          setHallWordsText(response.data)
        }
      })
      // 获取待办任务
      GetTask().then(response => {
        if (response.success) {
          setToDoTasksNumList(response.data.tasks || [])
          setToDoTasksNum(response.data.Total)
          if (response.data.total && response.data.total > 0) {
            setIsToDoTasksVisible(true)
          } else {
            setIsToDoTasksVisible(false)
          }
        }
      })
      // 获取堂里新鲜事
      GetAffairIndex().then(response => {
        if (response.success) {
          setCarouselList(response.data || [])
        }
      })
      // 获取每周堂里人
      GetAffairPersonIndex().then(response => {
        if (response.success) {
          setWeeklyChapelInfo(response.data)
        }
      })
      // 获取未读接口
      GetMessage().then(response => {
        if (response.success) {
          setUnreadInfoList(response.data.messages || [])
          setUnreadMessagesNum(response.data.total)
          // if (response.data.total && response.data.total > 0) {
          //   setIsUnreadVisible(true)
          // } else {
          //   setIsUnreadVisible(false)
          // }
        }
      })
    }
    info()
  }, []);
  useEffect(() => {
    // if (carouselList.length === 0) {
    //   return
    // }
    if (isHovering || isPlaying) {
      swiper?.autoplay?.stop();
    } else {
      swiper?.autoplay?.start();
    }

  }, [isHovering, swiper, isPlaying])

  const getYearWeek = (a, b, c) => {
    /*  
      date1是当前日期  
      date2是当年第一天  
      d是当前日期是今年第多少天  
      用d + 当前年的第一天的周差距的和在除以7就是本年第几周  
    */
    const date1 = new Date(a, parseInt(b) - 1, c);
    const date2 = new Date(a, 0, 1);
    const d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
  };
  const popoverContent = (
    <div>
      <CardComponent title noPadding bottomLookMore />
    </div>
  );

  const lookMoreHallPeople = (val) => {
    window.open('/yst-iwork-alpha/hall-people')
  };
  const lookMoreHallSomething = (val) => {
    window.open('/yst-iwork-alpha/hall-something')
  };
  const detailRouter = (val) => {
    window.open(`/yst-iwork-alpha/hall-something/detail?id=${val.id}`)
  };
  const detailHallPeople = (val) => {
    window.open(`/yst-iwork-alpha/hall-people/detail?id=${val.id}`)
  };
  const handleVisibleChange = (event, val) => {
    if (val === 1 && unreadMessagesNum) {
      setIsUnreadVisible(event)
    }
    if (val === 2 && toDoTasksNum) {
      setIsToDoTasksVisible(event)
    }
  }
  const handleEnded = React.useCallback((e) => {
    e.target.load();
    setIsPlaying(false);
  }, []);
  // 播放控制
  const handleClick = React.useCallback((e) => {
    e.target.controls = false;
    const video = e.target;
    if (video.paused || video.ended) {
      video.play();
      e.target.controlsStand = true
    } else {
      video.pause();
      e.target.controlsStand = false
    }
  }, []);
  // 播放控制 - 样式
  const handleCanPlay = React.useCallback((e) => {
    e.target.parentElement.dataset.state = "pause";
  }, []);
  const handlePause = React.useCallback((e) => {
    e.target.controlsStand = true
    e.target.parentElement.dataset.state = "pause";
    setIsPlaying(false);
  }, []);
  const handlePlaying = React.useCallback((e) => {
    e.target.controls = e.target.controlsStand;
    e.target.parentElement.dataset.state = "";
    setIsPlaying(true);
  }, []);
  const handleChange = (val) => {
    setCarouselCurrent(val.realIndex)
  }

  return (
    <div>
      <div className={styles.infoTitle}>
        <div className={styles.titleText}>
          <span className={styles.name}>
            {/* 亲爱的王佳佳，这是你在堂里的第<i className={styles.today}>{entryTime}</i>天 */}
            {entryTime}
          </span>
          <Divider className={styles.dividerVertical} type="vertical" />
          <img src={hallWords} alt="" />
          <span className={styles.HallWords}>
            {hallWordsText}
            {/* 能正确的提出问题就是迈出创新第一步能正确的提出问题就是迈出创最多出创最多三九字 */}
          </span>
        </div>
        <div className={styles.task}>
          <Popover placement="bottomRight"
            content={
              <CardComponent title noPadding bottomLookMore dataList={unreadInfoList} moreUrl="http://10.213.3.39:8088/AutoLogin.aspx?type=2" />
            }
            visible={isUnreadVisible}
            onVisibleChange={(val) => handleVisibleChange(val, 1)}
            trigger='hover'>
            <div className={styles.popoverStyle} onClick={() => { window.open(`http://10.213.3.39:8088/AutoLogin.aspx?type=2&token=${accessToken}`) }}>
              <img src={unreadMessages} alt="" />
              <span className={styles.messageText}>我的消息</span>
              <Badge
                className={styles.messageTost1}
                style={{ backgroundColor: '#CE1925' }}
                size="default"
                count={unreadMessagesNum}
              />
            </div>
          </Popover>
          <Popover placement="bottomRight"
            content={
              <CardComponent title noPadding bottomLookMore dataList={toDoTasksList} moreUrl="http://10.213.3.39:8088/AutoLogin.aspx?type=1" />
            }
            visible={isToDoTasksVisible}
            onVisibleChange={(val) => handleVisibleChange(val, 2)}
            trigger="hover">
            <div className={styles.popoverStyle} onClick={() => { window.open(`http://10.213.3.39:8088/AutoLogin.aspx?type=1&token=${accessToken}`) }}>
              <img src={toDoTasksImg} alt="" />
              <span className={styles.messageText}>待办任务</span>
              <Badge
                className={styles.messageTost2}
                style={{ backgroundColor: '#CE1925' }}
                size="default"
                count={toDoTasksNum}
              />
            </div>
          </Popover >
        </div >
      </div >
      {/* 堂里新鲜事 */}
      < div className={styles.somethingHall} >
        <div className={styles.leftContent}>
          <p className={styles.somethingHallTitle}>堂里新鲜事</p>
          <div className={styles.leftCarousel} ref={ref}>
            <div className={styles.Carousel}>
              {
                carouselList.length && <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  onSwiper={(swiper) => setSwiper(swiper)}
                  autoplay={{ delay: 2000 }}
                  loop
                  onSlideChange={handleChange}
                >
                  {carouselList.map((v, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className={styles.container}>
                          {v.href.videoMP4 ? (
                            <video
                              src={v.href.videoMP4}
                              poster={v.href.src}
                              onEnded={handleEnded}
                              onClick={handleClick}
                              onCanPlay={handleCanPlay}
                              onPause={handlePause}
                              onPlaying={handlePlaying}
                              preload="metadata"
                              muted
                            />
                          ) : (
                              <img style={{ width: '487px', height: '278px', borderRadius: '3px 0 0 3px' }} src={v.href.src} alt="pic" />
                            )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              }
            </div>
            <div className={styles.rightCarouselContent}>
              {carouselList &&
                carouselList.map((item, index) => (
                  <div
                    onClick={() => detailRouter(item)}
                    className={
                      carouselCurrent === index
                        ? `${styles.rightcontentText} ${styles.checkRightcontentText}`
                        : styles.rightcontentText
                    }
                    key={index}
                  >
                    <p className={styles.content} title={item.title}>{item.title}</p>
                    <p className={styles.content} title={item.content}>{item.content}</p>
                  </div>
                ))}
              <div onClick={lookMoreHallSomething} className={styles.lookMore}>
                查看更多
              </div>
            </div>
          </div>
          {/* <div className={styles.spingLoading}><Spin spinning={spinning} /></div> */}
        </div>
        <div className={styles.rightContent}>
          <img className={styles.hallPeopleBackground} src={HallPeople} alt="" />
          <div className={styles.contentInfo} onClick={() => detailHallPeople(WeeklyChapelInfo)}>
            <p className={styles.currentWeek}>{WeeklyChapelInfo && WeeklyChapelInfo.weekIndex}</p>
            <p className={styles.contentText} title={WeeklyChapelInfo && WeeklyChapelInfo.content}>
              {WeeklyChapelInfo && WeeklyChapelInfo.content}
            </p>
            <p className={styles.hallPeopleName}>
              <span>{WeeklyChapelInfo && WeeklyChapelInfo.userName}</span>
              <span>— {WeeklyChapelInfo && WeeklyChapelInfo.company}</span>
            </p>
            <p className={styles.hallPeopleImg}>
              <img src={WeeklyChapelInfo && WeeklyChapelInfo.href && WeeklyChapelInfo.href.src} alt="" />
            </p>
          </div>
          <div className={styles.lookMore} onClick={() => lookMoreHallPeople()}>
            查看更多
          </div>
        </div>
      </div >
    </div >
  );
};
export default withRouter(HallNews);
