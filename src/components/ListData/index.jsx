import React from 'react'
import styles from './styles.less'
import bannerImg from '@/assets/img/banner@2x.png';
import week from '@/assets/img/week.png';
import waterHealth from '@/assets/img/waterHealth.png';
import read from '@/assets/img/read.png';
import praise from '@/assets/img/praise.png';
import { ListDataInfo } from '@/constants/mock'
import stick from '@/assets/img/stick.png'


const ListData = (props) => {
  let { isStickIcon, isShowWeek, isLine, isInfoIntro } = props
  return (
    <div className={styles.listComponent}>
      <div className={styles.banner}>
        <img src={bannerImg} alt="" />
      </div>
      <div className={styles.listInfo}>
        <p>每周堂里人</p>
        {
          ListDataInfo && ListDataInfo.map((item, index) => (
            <div className={styles.listConent} key={index}>
              <p className={styles.leftImg}>
                <img className={styles.contentImg} src={waterHealth} alt="" />
                {
                  isShowWeek ?
                    <>
                      <img className={styles.week} src={week} alt="" />
                      <span>56</span>
                    </>
                    : <></>
                }

              </p>
              <div className={styles.rightContent}>
                <div className={styles.rightDetailInfo}>
                  <p className={isLine ? styles.contentName : `${styles.contentName} ${styles.contentNameStyle}`}>
                    {
                      isStickIcon ? <img src={stick} alt="" /> : <></>
                    }
                    <span>{item.name}</span>
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
                    <p>发布者：{item.promulgator}</p>
                    <p className={styles.praiseAmount}>
                      <img src={praise} alt="" />
                      <span>赞</span>
                    </p>
                    <p className={styles.readAmount}>
                      <img src={read} alt="" />
                      <span>阅读</span>
                    </p>
                  </div>
                  <p>2020.08.31</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default ListData