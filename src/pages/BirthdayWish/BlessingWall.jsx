import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd';

import styles from './styles.less'
import { GetWishList } from '@/api/birthdayWish'


const BlessingWall = (props) => {
  const [dataList, setDataList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  let { query } = props.location

  const getWishListInfo = (page) => {
    let params = {
      userId: query.userId,
      wishType: query.wishType,
      pageSize: 999,
      pageIndex: page
    }
    GetWishList(params).then(res => {
      if (res.success) {
        setDataList(res.data.wishList || [])
      }
    })
  }
  useState(() => {
    getWishListInfo(1)
  }, [])
  return (
    <div className={styles.blessingWall}>
      <div className={styles.bannerImg}>
        <div>
          <p className={styles.birthdayImg}>
            <img src="" alt="" />
          </p>
          <p className={styles.date}>
            2020-10-25
        </p>
        </div>
      </div>
      <p className={styles.name}>王佳佳 生日快乐</p>
      {/* ta收到的祝福---无数据 */}

      {/* 我送出的祝福--无数据 */}
      {/* <div className={styles.noContentInfo2}>
        <p>快去送礼物吧～</p>
        <Button type="primary" size="large">去送祝福</Button>
      </div> */}
      {
        dataList.length ? <>
          <div className={styles.cardInfoContentBottm}>
            {
              dataList.length && dataList.map((item, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.cardImg}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.cardToName}>To:{item.userName}</p>
                    <p className={styles.cardInfoContent}>{item.content}</p>
                    <p className={styles.cardFromName}>From:{item.sendUserName}</p>
                  </div>
                  <div className={styles.replyButton}>
                    <Button type="primary" size="small">回复ta</Button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className={styles.sendBlessingbutton}>
            <Button type="primary" size="large">送祝福</Button>
          </div>
        </> : <div className={styles.noContentInfo}>
            <p>快来给TA送祝福吧～</p>
            <Button type="primary" size="large">送祝福</Button>
          </div>
      }
      {/* <div className={styles.footerInput}>
        <div>
          <Input prefix="回复TA："
            className={styles.contentInput}
            style={{ width: '1058px', height: '52px', backgroundColor: '#F6F6F6' }} />
          <Button type="link" size="large" style={{ marginLeft: '34px' }}>发送</Button>
        </div>
      </div> */}
    </div>
  )
}
export default BlessingWall