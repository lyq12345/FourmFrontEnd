import React from 'react'
import styles from './styles.less'
import bannerImg from '@/assets/img/banner@2x.png';
import week from '@/assets/img/week.png';
import waterHealth from '@/assets/img/waterHealth.png';
import read from '@/assets/img/read.png';
import praise from '@/assets/img/praise.png';
// import { ListDataInfo } from '@/constants/mock'
import stick from '@/assets/img/stick.png'


const ListData = (props) => {
  let { isStickIcon, isShowWeek, isLine, isInfoIntro, ListDataInfo, routerLink = () => { }, } = props
  return (
    <div className={styles.listComponent}>
      <div className={styles.banner}>
        <img src={bannerImg} alt="" />
      </div>
      <div className={styles.listInfo}>
        <p>每周堂里人</p>
        {
          ListDataInfo.affairs && ListDataInfo.affairs.length && ListDataInfo.affairs.map((item, index) => (
            <div className={styles.listConent} key={index} onClick={() => routerLink(item)}>
              <p className={styles.leftImg}>
                <img className={styles.contentImg} src={waterHealth} alt="" />
                {
                  isShowWeek ?
                    <>
                      <img className={styles.week} src={week} alt="" />
                      <span>{item.weekIndex}</span>
                    </>
                    : <></>
                }

              </p>
              <div className={styles.rightContent}>
                <div className={styles.rightDetailInfo}>
                  <p className={isLine ? styles.contentName : `${styles.contentName} ${styles.contentNameStyle}`}>
                    {
                      isStickIcon && (item.isUp === 1) ? <img src={stick} alt="" /> : <></>
                    }
                    {
                      isLine ? <span>{item.userName}</span> : <span>{item.title}</span>
                    }

                  </p>
                  {
                    isLine ?
                      <p className={styles.line}></p> : <></>
                  }
                  {
                    isInfoIntro ?
                      <p className={styles.companie}>{item.companie}</p> : <></>
                  }
                  <p className={styles.detailContent}>{item.content}</p>
                </div>
                <div className={styles.authorAndRestsInfo}>
                  <div>
                    <p>发布者：{item.creator}</p>
                    <p className={styles.praiseAmount}>
                      <img src={praise} alt="" />
                      <span>赞</span><span style={{ marginLeft: '5px' }}>{item.loveCount}</span>
                    </p>
                    <p className={styles.readAmount}>
                      <img src={read} alt="" />
                      <span>阅读</span><span style={{ marginLeft: '5px' }}>{item.showCount}</span>
                    </p>
                  </div>
                  <p>{item.createDate}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div >
  )
}
export default ListData