import React, { useState, useEffect } from 'react'
import { Button, Input, message } from 'antd';

import styles from './styles.less'
import { GetWishList, ReplyWish } from '@/api/birthdayWish'


const BlessingWall = (props) => {
  const [dataList, setDataList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isReplytoBoxVisible, setIsReplytoBoxVisible] = useState(false)
  const [checkedName, setCheckedName] = useState('ta')
  const [checkedInfo, setCheckedInfo] = useState({})
  const [replyContent, setReplyContent] = useState(null)

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
  const handleClick = (val, index) => {
    setReplyContent(null)
    setCheckedName(val.sendUserName)
    setIsReplytoBoxVisible(true)
    setCheckedInfo(val)
  }
  const sendMessage = () => {
    let wishIdList = []
    if (checkedName === 'ta') {
      wishIdList = dataList.map(item => item.wishId)
    }
    let params = {
      wishIds: wishIdList.length ? wishIdList : checkedInfo.wishId,
      content: replyContent
    }
    ReplyWish(JSON.stringify(params)).then(res => {
      if (res.success) {
        message.success('回复成功')
      }
    })
  }
  const checkedInput = (val) => {
    setReplyContent(val.target.value)
  }
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
      {
        query.type === 2 ? <div className={styles.replyButton}>
          <Button type="primary" size="large" onClick={() => {
            setCheckedName("ta")
            setIsReplytoBoxVisible(true)
            setReplyContent(null)
          }}>回复全部</Button>
        </div> : <></>
      }
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
                    <p className={styles.cardToName}>To：{item.userName}</p>
                    <p className={styles.cardInfoContent}>{item.content}</p>
                    <p className={styles.cardFromName}>From：{item.sendUserName}</p>
                  </div>
                  <div className={styles.replyButton}>
                    <Button type="primary" size="small" onClick={() => handleClick(item, index)}>回复ta：</Button>
                  </div>
                </div>
              ))
            }
          </div>
          {
            query.type === 2 ? <div className={styles.sendBlessingbutton}>
              <Button type="primary" size="large">送祝福</Button>
            </div> : <></>
          }

        </> : <div className={styles.noContentInfo}>
            <p>快来给TA送祝福吧～</p>
            <Button type="primary" size="large">送祝福</Button>
          </div>
      }
      {
        isReplytoBoxVisible ? <div className={styles.footerInput}>
          <div>
            <Input prefix={`回复${checkedName}：`}
              className={styles.contentInput}
              onChange={(e) => checkedInput(e)}
              value={replyContent}
              style={{ width: '1058px', height: '52px', backgroundColor: '#F6F6F6' }} />
            <Button type="link" size="large" style={{ marginLeft: '34px' }} onClick={() => sendMessage()}>发送</Button>
          </div>
        </div> : <></>
      }

    </div>
  )
}
export default BlessingWall