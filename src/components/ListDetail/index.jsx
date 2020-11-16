import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import read from '@/assets/img/read.png';
import praise from '@/assets/img/praise.png';
import { SetAffairLove } from '@/api/common'
import { ListDataInfo } from '@/constants/mock'
import stick from '@/assets/img/stick.png'
import waterHealth from '@/assets/img/waterHealth.png';
import endGiveLike from '@/assets/img/endGiveLike.png';
import noGiveLike from '@/assets/img/noGiveLike.png';
import HWPlayer from "HWPlayer";
import hwplayerloaded from "hwplayerloaded";

let player
const ListDetail = (props) => {
  const [praiseStatus, setPraiseStatus] = useState(false)
  const [praiseNum, setPraiseNum] = useState(0)

  const { isName, isLine, isInfoIntro, dataInfo, giveLikeNum, id, type } = props
  useEffect(() => {
    return () => player && player.dispose()
  }, [])
  useEffect(() => {
    if (dataInfo && dataInfo.href && dataInfo.href.video) {
      hwplayerloaded(() => {
        initVideo()
      })
    }
    if (dataInfo) {
      setPraiseNum(dataInfo.loveCount)
    }
    // return () => player && player.dispose()
  }, [dataInfo && dataInfo.href && dataInfo.href.video])
  const initVideo = () => {
    let userAgent = navigator.userAgent
    var options = {
      //是否显示控制栏，包括进度条，播放暂停按钮，音量调节等组件
      poster: dataInfo.href.src,
      height: 447,
      width: 800,
      type: 'application/x-mpegURL'
    };
    player = HWPlayer(`detail-video`, options, function () {
      //播放器已经准备好了
      player.src(userAgent.indexOf("Firefox") > -1 ? dataInfo.href.videoMP4 : dataInfo.href.video);

    });
  }
  // 点赞
  const dotPraise = () => {
    if (!praiseStatus && dataInfo.isLove == 0) {
      // setPraiseNum(praiseNum + 1)
      SetAffairLove({ id: id, ltype: type }).then(response => {
        if (response.success) {
          setPraiseStatus(true)
          setPraiseNum(response.data || 0)
        }
      })
    }
  }
  return (
    <div className={styles.listDetail}>
      <div className={styles.detailComponent}>
        <p className={styles.title}>{dataInfo && dataInfo.title}</p>
        <div className={styles.authorAndRestsInfo}>
          <div>
            <p>发布者：{dataInfo && dataInfo.creator}</p>
            <p className={styles.readAmount}>
              <img src={read} alt="" />
              <span>阅读</span><span style={{ marginLeft: '5px' }}>{dataInfo && dataInfo.showCount}</span>
            </p>
            <p>{dataInfo && dataInfo.createDate}</p>
          </div>
        </div>
        <div className={styles.imgOrVideo}>
          {
            dataInfo && dataInfo.href && dataInfo.href.video ?
              <video
                id='detail-video'
                width="800"
                muted
                height="447"
                className="video-js vjs-default-skin vjs-big-play-centered"
              ></video>
              : <img src={dataInfo && dataInfo.href && dataInfo.href.src} alt="" />
          }
        </div>
        <div className={styles.contentIntroduced}>
          {
            isName ? <p className={styles.name}>{dataInfo && dataInfo.userName}</p> : <></>
          }
          {
            isLine ? <p className={styles.line}></p> : <></>
          }
          {
            isInfoIntro ? <p className={styles.companie}>{dataInfo && dataInfo.company}</p> : <></>
          }
          <div className={styles.detailInfo}>
            {dataInfo && dataInfo.content}
          </div>
        </div>
        <div className={praiseStatus || (dataInfo && dataInfo.isLove == 1) ? `${styles.fakeLikes} ${styles.fakeLikesBackground}` : styles.fakeLikes} onClick={() => dotPraise()}>
          <p className={styles.fakeLikesImg}>
            {
              praiseStatus || (dataInfo && dataInfo.isLove == 1) ?
                <img src={endGiveLike} alt="" />
                : <img src={noGiveLike} alt="" />
            }
          </p>
          <p className={styles.fakeLikesNum}>{praiseNum}</p>
        </div>
        <p className={styles.fakeLikeTost}>— 好的东西 · 值得点赞支持一下 —</p>
      </div>
    </div>
  )
}
export default ListDetail