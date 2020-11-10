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
// import HWPlayer from "HWPlayer";
// import hwplayerloaded from "hwplayerloaded";
import Swiper from 'swiper';

import Slider from "react-slick";

let video2 = {}
// let mySwiper = new Swiper('.swiper-container', {
//   loop: true, // 循环模式选项
//   autoplay: true,//等同于以下设置
// })
let slickConfig
let waterSwiper = {}
// let player
let player = {}

const HallNews = (props) => {
  const [yearWeek, setYearWeek] = useState(null);
  const [carouselCurrent, setCarouselCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [topVideo, setTopVideo] = useState({});
  const swiperRef = useRef()
  const [spinning, setSpinning] = useState(true)
  const [entryTime, setEntryTime] = useState(null)
  const [hallWordsText, setHallWordsText] = useState(null)
  const [unreadMessagesNum, setUnreadMessagesNum] = useState(null)
  const [toDoTasksNum, setToDoTasksNum] = useState(null)
  const [carouselList, setCarouselList] = useState([])
  const [unreadInfoList, setUnreadInfoList] = useState({})
  const [toDoTasksList, setToDoTasksNumList] = useState({})
  const [WeeklyChapelInfo, setWeeklyChapelInfo] = useState({})
  const [isPaly, setIsPaly] = useState(true)
  const [controlsPlay, setControlsPlay] = useState(true)
  const [isToDoTasksVisible, setIsToDoTasksVisible] = useState(false)
  const [isUnreadVisible, setIsUnreadVisible] = useState(false)

  useEffect(() => {
    const myDate = new Date();
    const fullYear = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    setYearWeek(getYearWeek(fullYear, month, day));
    info()
  }, []);
  useEffect(() => {
    let idArr = []
    if (carouselList.length === 0) {
      return
    }
    let realIndex = null
    waterSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      allowTouchMove: false,//禁止拖动
      on: {
        slideChangeTransitionEnd: function () {
          setIsPaly(true)
          realIndex = this.realIndex
          setCarouselCurrent(this.realIndex);
        },
        touchStart: (swiper, event) => {
          setIsPaly(false)
          player = swiper.target.children.length ? swiper.target.children[0] : swiper.target
          if (swiper.target && swiper.target.children && swiper.target.children.length) {
            let { paused, ended, controls } = swiper.target && swiper.target.children && swiper.target.children[0]
            swiper.target.children[0].controls = true
            if (paused || ended) {
              setIsPaly(false)
              swiper.target.children[0].play()
            }
          } else {
            if (carouselList[realIndex].href && !carouselList[realIndex].href.videoMP4) {
              detailRouter(carouselList[realIndex])
              return
            }
            swiper.target.controls = true
            if (player.paused || player.ended) {
              setIsPaly(false)
              console.log('swiper.target.play()', '11111111111111111')
              // swiper.target.play()
            }
          }
          player && player.addEventListener('play', function (e) {
            setIsPaly(false)
            console.log('player.addEventListener-play', '11111111111111111')
            waterSwiper && waterSwiper.autoplay.stop()
          })
          player && player.addEventListener('pause', function (e) {
            console.log('player.addEventListener-pause', '11111111111111111')
            waterSwiper && waterSwiper.autoplay.stop()
          })
          player && player.addEventListener('ended', function (e) {
            e.target.load()
            waterSwiper && waterSwiper.autoplay.start()
          })
        }
      }
    })
    // carouselList && carouselList.forEach((v, i) => initVideo(i))


  }, [carouselList && carouselList.length])

  // const initVideo = (index, value, copy) => {
  //   let id = copy ? value : index
  //   player = document.getElementById(`videoPlay${id}`)
  //   player && player.addEventListener('play', function (e) {
  //     setIsPaly(false)
  //     waterSwiper && waterSwiper.autoplay.stop()
  //     console.log('player.addEventListener-play', '11111111111111111')
  //   })
  //   player && player.addEventListener('pause', function (e) {
  //     waterSwiper && waterSwiper.autoplay.stop()
  //     console.log('player.addEventListener-pause', '11111111111111111')
  //   })
  //   player && player.addEventListener('ended', function (e) {
  //     e.target.load()
  //     // setIsPaly(true)
  //     waterSwiper && waterSwiper.autoplay.start()
  //   })
  // }
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
        response.data[3].href.src = 'https://file-cloud.yst.com.cn/website/2020/04/09/5b47a54a68714de99bc14c05bf723b19.png'
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
        if (response.data.total && response.data.total > 0) {
          setIsUnreadVisible(true)
        } else {
          setIsUnreadVisible(false)
        }
      }
    })
  }
  // 堂里新鲜事移除 /**遗留问题，移除区域后视频正在播放会有问题 */
  const isHovering = useHover(() => document.getElementById('hover-div'), {
    onEnter: () => {
      waterSwiper && waterSwiper.autoplay && waterSwiper.autoplay.stop()
    },
    onLeave: () => {
      if ((player && player.paused) || (player && player.ended)) {
        waterSwiper && waterSwiper.autoplay && waterSwiper.autoplay.start()
      }
    },
  });
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
  // const carouselFun = (current) => {
  //   console.log(current, '111111111111111111111111111')
  //   setIsPaly(true)
  //   setCarouselCurrent(current);
  // };
  const carouselHandleClick = (val, index) => {
    // if (!val.href.videoMP4) {
    //   detailRouter(val)
    // }
  }

  const goPlay = (item, index) => {
    setAutoplay(false)
  }

  const lookMoreHallPeople = (val) => {
    window.open('/hall-people')
  };
  const lookMoreHallSomething = (val) => {
    window.open('/hall-something')
  };
  const detailRouter = (val) => {
    window.open(`/hall-something/detail?id=${val.id}`)
  };
  const detailHallPeople = (val) => {
    window.open(`/hall-people/detail?id=${val.id}`)
  };
  const playVideo = () => {
    setIsPaly(false)
  }
  const handleVisibleChange = (event, val) => {
    if (val === 1 && unreadMessagesNum) {
      setIsUnreadVisible(event)
    }
    if (val === 2 && toDoTasksNum) {
      setIsToDoTasksVisible(event)
    }
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
            <div className={styles.popoverStyle} onClick={() => { window.open('http://10.213.3.39:8088/AutoLogin.aspx?type=2') }}>
              <img src={unreadMessages} alt="" />
              <span className={styles.messageText}>我的消息</span>
              <Badge
                className={styles.messageTost1}
                style={{ backgroundColor: '#CE1925' }}
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
            <div className={styles.popoverStyle} onClick={() => { window.open('http://10.213.3.39:8088/AutoLogin.aspx?type=1') }}>
              <img src={toDoTasksImg} alt="" />
              <span className={styles.messageText}>待办任务</span>
              <Badge
                className={styles.messageTost2}
                style={{ backgroundColor: '#CE1925' }}
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
          <div className={styles.leftCarousel} id="hover-div">
            <div className={styles.Carousel}>
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {
                    carouselList && carouselList.map((item, index) => (
                      <div key={index} className={`swiper-slide swiper-slide-${index} ${item.href.videoMP4 && isPaly ? styles.videoPlayStyle : ''}`} onClick={() => setIsPaly(false)}>
                        <video
                          src={item.href.videoMP4}
                          poster={item.href.src}
                          onPlay={() => setIsPaly(false)}
                          id={`videoPlay${index}`}
                          muted
                          className={`video-js vjs-default-skin vjs-big-play-centered ${styles.videoPlayStyle}`}
                        ></video>
                      </div>
                    ))
                  }
                </div>
              </div>
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
            <p className={styles.currentWeek}>{yearWeek}</p>
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
