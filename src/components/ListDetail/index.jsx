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

  const { isName, isLine, isInfoIntro, dataInfo, giveLikeNum } = props
  useEffect(() => {
    hwplayerloaded(() => {
      initVideo()
    })
    return () => player && player.dispose()
  }, [])
  const initVideo = () => {
    var options = {
      //是否显示控制栏，包括进度条，播放暂停按钮，音量调节等组件
      poster: 'https://file-cloud.yst.com.cn/website/2020/04/09/6d09ad7ccba14e19ad324c0ab0f7640a.png',
      height: 447,
      width: 800,
    };
    player = HWPlayer(`detail-video`, options, function () {
      //播放器已经准备好了
      player.src('https://videos.nfsq.com.cn/asset/a2290e25e7a1e66e7897336ae6d12c4d/play_video/522fc926a3bacbecfe73ceea735dbf36.m3u8');
    });
  }
  // 点赞
  const dotPraise = () => {
    if (!praiseStatus) {
      setPraiseStatus(true)
      // setPraiseNum(praiseNum + 1)
      SetAffairLove({ id: '' }).then(response => {
        if (response.success) {
          setPraiseNum(response.data || 0)
        }
      })
    }
  }
  return (
    <div className={styles.listDetail}>
      <div className={styles.detailComponent}>
        <p className={styles.title}>{dataInfo.title}</p>
        <div className={styles.authorAndRestsInfo}>
          <div>
            <p>发布者：刘琦</p>
            <p className={styles.readAmount}>
              <img src={read} alt="" />
              <span>阅读</span><span style={{ marginLeft: '5px' }}>{dataInfo.showCount}</span>
            </p>
            <p>{dataInfo.createDate}</p>
          </div>
        </div>
        <div className={styles.imgOrVideo}>
          <img src={waterHealth} alt="" />
          {/* <video
            id='detail-video'
            width="800"
            height="447"
            className="video-js vjs-default-skin vjs-big-play-centered"
          ></video> */}
        </div>
        <div className={styles.contentIntroduced}>
          {
            isName ? <p className={styles.name}>饶红明</p> : <></>
          }
          {
            isLine ? <p className={styles.line}></p> : <></>
          }
          {
            isInfoIntro ? <p className={styles.companie}>农夫山泉股份有限公司/生产营运中心</p> : <></>
          }
          <div className={styles.detailInfo}>
            {dataInfo.content}
          </div>
        </div>
        <div className={praiseStatus ? `${styles.fakeLikes} ${styles.fakeLikesBackground}` : styles.fakeLikes} onClick={() => dotPraise()}>
          <p className={styles.fakeLikesImg}>
            {
              praiseStatus ?
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