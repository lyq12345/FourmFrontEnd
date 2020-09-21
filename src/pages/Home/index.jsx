import React, { useEffect, useState, useRef } from 'react';
import { Card, Carousel, Popover, Badge } from 'antd';
import toDoTasks from '@/assets/img/To-do-tasks.png';
import unreadMessages from '@/assets/img/Unread-messages.png';
import hallWords from '@/assets/img/Hall-words.png';
import HallPeople from '@/assets/img/HallPeople.png';
import waterHealth from '@/assets/img/waterHealth.png';
import play from '@/assets/img/play.png';
import MySchedule from '@/components/MySchedule';
import Birthday from './components/Birthday';
import CardComponent from '@/components/Card';
import styles from './style.less';
import { carousel } from '@/constants/mock';
import { withRouter } from 'umi';
import MyNav from '@/components/MyNav';
import TangGuoBi from '@/components/TangGuoBi';
import HWPlayer from "HWPlayer";
import hwplayerloaded from "hwplayerloaded";
import { set } from 'lodash';

// let topVideo = {}
let video2 = {}
const Home = (props) => {
  const [yearWeek, setYearWeek] = useState(null);
  const [carouselCurrent, setCarouselCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const [topVideo, setTopVideo] = useState({});

  useEffect(() => {
    const myDate = new Date();
    const fullYear = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    setYearWeek(getYearWeek(fullYear, month, day));
    // info()
    // carousel.map((item, index) => {
    //   initVideo(index)
    // })
    hwplayerloaded(() => { initVideo(0) })
    // initVideo(0)
  }, []);
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
    initVideo(current)
    setCarouselCurrent(current);
  };

  const goPlay = (item, index) => {
    setAutoplay(false)
  }
  // 初始化回调
  const initVideo = (index) => {
    // setAutoplay(false)
    console.error("initvideo")

    console.error("hwplayerloaded")
    var options = {
      //是否显示控制栏，包括进度条，播放暂停按钮，音量调节等组件
      // controls: index ? false : true,
      // controls: true,
      poster: carousel[index].img,
      sources: carousel[index].src
    };
    var player = HWPlayer(`#video-${index}`, options, function () {
      console.log('hw loaded')
      //播放器已经准备好了
      // player.src();
      // "this"指向的是HWPlayer的实例对象player
      // player.play();
      // // 使用事件监听
      player.on('ended', function () {
        //播放结束了
        setAutoplay(true)
      });
    });
    console.log(autoplay)

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
    });
  };
  const detailHallPeople = (val) => {
    props.history.push({
      pathname: '/hall-people/detail',
    });
  };

  return (
    <div>
      <div className={styles.infoTitle}>
        <div className={styles.titleText}>
          <span className={styles.name}>
            亲爱的王佳佳，这是你在堂里的第<i className={styles.today}>2020</i>天
          </span>
          <span>|</span>
          <img src={hallWords} alt="" />
          <span className={styles.HallWords}>
            能正确的提出问题就是迈出创新第一步能正确的提出问题就是迈出创最多出创最多三九字
          </span>
        </div>
        <div className={styles.task}>
          <Popover placement="bottomRight" content={popoverContent} trigger="hover">
            <div>
              <img src={unreadMessages} alt="" />
              <span className={styles.messageText}>未读消息</span>
              <Badge
                className={styles.messageTost1}
                style={{ backgroundColor: '#CE1925' }}
                count={25}
              />
            </div>
          </Popover>
          <Popover placement="bottomRight" content={popoverContent} trigger="hover">
            <div>
              <img src={toDoTasks} alt="" />
              <span className={styles.messageText}>待办任务</span>
              <Badge
                className={styles.messageTost2}
                style={{ backgroundColor: '#CE1925' }}
                count={108}
              />
            </div>
          </Popover>
        </div>
      </div>
      {/* 堂里新鲜事 */}
      <div className={styles.somethingHall}>
        <div className={styles.leftContent}>
          <p className={styles.somethingHallTitle}>堂里新鲜事</p>
          <div className={styles.leftCarousel}>
            <div className={styles.Carousel}>
              <Carousel autoplay={autoplay} autoplaySpeed={4000} afterChange={carouselFun}>
                {/* <div className={styles.play}> */}
                {/* </div> */}
                {carousel &&
                  carousel.map((item, index) => (
                    <div className={styles.carouselContentImg} onClick={() => goPlay(item, index)} key={index}>
                      <video
                        id={`video-${index}`}
                        style={{ width: '487px', height: '278px' }}
                        playsInline
                        x5-video-player-type="h5"
                        x5-playsinline="true"
                        webkit-playsinline="true"
                        x5-video-orientation="landscape"
                        width="487"
                        // autoPlay
                        height="278"
                        className="video-js vjs-default-skin vjs-big-play-centered"
                      ></video>
                      {/* <img className={styles.playImg} src={item.img} alt="" /> */}
                      {/* <img src='https://file-cloud.yst.com.cn/website/2020/04/09/4344036bdf6e4293b55b4672c9b75a29.png' alt="" /> */}
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className={styles.rightCarouselContent}>
              {carousel &&
                carousel.map((item, index) => (
                  <div
                    onClick={() => detailRouter()}
                    className={
                      carouselCurrent === index
                        ? `${styles.rightcontentText} ${styles.checkRightcontentText}`
                        : styles.rightcontentText
                    }
                    key={index}
                  >
                    <p>{item.title}</p>
                    <p>{item.content}</p>
                  </div>
                ))}
              <div onClick={lookMoreHallSomething} className={styles.lookMore}>
                查看更多
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <img className={styles.hallPeopleBackground} src={HallPeople} alt="" />
          <div className={styles.contentInfo} onClick={() => detailHallPeople()}>
            <p className={styles.currentWeek}>{yearWeek}</p>
            <p className={styles.contentText}>
              利他，不仅仅是顺境下的按部就班，更是逆境中 的迎难而上。不管遇到什么困难，最展示四十字
            </p>
            <p className={styles.hallPeopleName}>
              <span>饶红明</span>
              <span>— 农夫山泉股份有限公司/生产营运中心</span>
            </p>
            <p className={styles.hallPeopleImg}>
              <img src={waterHealth} alt="" />
            </p>
          </div>
          <div className={styles.lookMore} onClick={() => lookMoreHallPeople()}>
            查看更多
          </div>
        </div>
      </div >
      <div className={styles.otherContent}>
        <div className={styles.leftContent}>
          <MyNav />
          <TangGuoBi />
          <Birthday />
        </div>
        <div className={styles.rightContent}>
          <MySchedule />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </div>
      {/* <ModelAdvertising /> */}
    </div >
  );
};
export default withRouter(Home);
