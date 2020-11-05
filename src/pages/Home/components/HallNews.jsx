import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Card, Carousel, Popover, Badge, Spin, Divider } from 'antd';
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
  const [autoplay, setAutoplay] = useState(false);
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
  // const viedoRef0 = useRef(null)
  // const viedoRef1 = useRef(null)
  // const viedoRef2 = useRef(null)
  // const viedoRef3 = useRef(null)

  useEffect(() => {
    const myDate = new Date();
    const fullYear = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    let activeIndex = null
    setYearWeek(getYearWeek(fullYear, month, day));
    info()
    // videoPlay
    // return () => {
    //   Object.values(playerMap).map(player => {
    //     player.dispose()
    //   })
    // }
  }, []);
  useEffect(() => {
    let idArr = []
    // hwplayerloaded(() => {
    //   setSpinning(false)
    // let dom = document.getElementsByClassName(`swiper-slide`)
    // carouselList.forEach((v, i) => initVideo(i))
    // carouselList.forEach((v, i) => {
    //   if (v.href && v.href.video) {
    //     initVideo(i)
    //   }
    // })
    // if (dom && dom.length > 1) {
    //   for (var v = 0; v < dom.length; v++) {
    //     let myId = dom[v].children[0]
    //     let idSub = JSON.parse(JSON.stringify(dom[v].children[0].id))
    //     console.log(idArr.includes(myId.id), idArr, myId.id, '--------------')
    //     if (idArr.includes(myId.id)) {
    //       myId.id = `video-${v}`
    //       initVideo(idSub.split('-')[1], v, 'firstCpy')
    //     }
    //     if (myId.id) {
    //       idArr.push(myId.id)
    //     }
    //   }
    // }
    // })
    waterSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      allowTouchMove: false,//禁止拖动
      on: {
        slideChangeTransitionEnd: function () {
          carouselFun(this.realIndex)
        }
      }
    })
    // player = document.getElementById('videoPlay')
    // player && player.play();
    // playVideo()
    // carouselList && carouselList.map((v_, index) => initVideo(v_, index))
    let dom = document.getElementsByClassName(`swiper-slide`)
    carouselList && carouselList.forEach((v, i) => initVideo(i))
    // carouselList.forEach((v, i) => {
    //   if (v.href && v.href.video) {
    //     initVideo(i)
    //   }
    // })
    if (dom && dom.length > 1) {
      for (var v = 0; v < dom.length; v++) {
        let myId = dom[v].children[0]
        let idSub = JSON.parse(JSON.stringify(dom[v].children[0].id))
        if (idArr.includes(myId.id)) {
          myId.id = `videoPlay${v}`
          initVideo(idSub.split('-')[1], v, 'firstCpy')
        }
        if (myId.id) {
          idArr.push(myId.id)
        }
      }
    }


  }, [carouselList && carouselList.length])

  const initVideo = (index, value, copy) => {
    let id = copy ? value : index
    player = document.getElementById(`videoPlay${id}`)
    player && player.addEventListener('play', function (e) {
      waterSwiper && waterSwiper.autoplay.stop()
    })
    player && player.addEventListener('pause', function (e) {
      waterSwiper && waterSwiper.autoplay.start()
    })
    player && player.addEventListener('ended', function (e) {
      e.target.load()
      waterSwiper && waterSwiper.autoplay.start()
    })
  }
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
      }
    })
  }
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
  const carouselFun = (current) => {
    setIsPaly(true)
    setCarouselCurrent(current);
  };
  const carouselHandleClick = (val, index) => {
    // waterSwiper && waterSwiper.autoplay.stop()
    if (val.href.videoMP4) {
      initVideo(val, index)
    } else {
      waterSwiper && waterSwiper.autoplay.stop()
      detailRouter(val)
    }
  }

  const goPlay = (item, index) => {
    setAutoplay(false)
  }

  const lookMoreHallPeople = (val) => {
    props.history.push({
      pathname: '/hall-people',
    });
  };
  const lookMoreHallSomething = (val) => {
    props.history.push({
      pathname: '/hall-something',
    });
  };
  const detailRouter = (val) => {
    props.history.push({
      pathname: '/hall-something/detail',
      state: { id: val.id }
    });
  };
  const detailHallPeople = (val) => {
    props.history.push({
      pathname: '/hall-people/detail',
      state: { id: val.id }
    });
  };

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
          <Popover placement="bottomRight" content={
            <CardComponent title noPadding bottomLookMore dataList={unreadInfoList} />
          } trigger="hover">
            <div>
              <img src={unreadMessages} alt="" />
              <span className={styles.messageText}>未读消息</span>
              <Badge
                className={styles.messageTost1}
                style={{ backgroundColor: '#CE1925' }}
                count={unreadMessagesNum}
              />
            </div>
          </Popover>
          <Popover placement="bottomRight" content={
            <CardComponent title noPadding bottomLookMore dataList={toDoTasksList} />
          } trigger="hover">
            <div>
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
          <div className={styles.leftCarousel}>
            <div className={styles.Carousel}>
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {
                    carouselList && carouselList.map((item, index) => (
                      <div key={index} className={`swiper-slide swiper-slide-${index}`} onClick={() => carouselHandleClick(item, index)}>
                        <video
                          controls={item.href.videoMP4 ? true : false}
                          src={item.href.videoMP4}
                          poster={item.href.src}
                          id={`videoPlay${index}`}
                          // id='videoPlay'
                          // ref={`viedoRef${index}`}
                          muted
                          width="487"
                          height="278"
                          style={{ width: '487px', height: '278px' }}
                          className="video-js vjs-default-skin vjs-big-play-centered"
                        ></video>
                        {/* {
                          item.href.videoMP4 && isPaly ? <img onClick={() => carouselHandleClick(item, index)} className={styles.carouselPlayImg} src={playImg}></img> : <></>
                        } */}
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
            <p className={styles.contentText}>
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
