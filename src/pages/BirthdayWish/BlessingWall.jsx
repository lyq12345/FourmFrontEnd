import React, { useState, useEffect } from 'react'
import { Button, Input, message } from 'antd';

import styles from './styles.less'
import { GetWishList, ReplyWish } from '@/api/birthdayWish'
import WishDialog from '@/components/WishDialog'
import birthdayBanner from '@/assets/img/birthdayBanner.png'
import noContent from '@/assets/img/noContent.png'
import showDown from '@/assets/img/showDown.png'
import showUp from '@/assets/img/showUp.png'


const BlessingWall = (props) => {
  const [dataList, setDataList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isReplytoBoxVisible, setIsReplytoBoxVisible] = useState(false)
  const [checkedName, setCheckedName] = useState('全部')
  const [checkedInfo, setCheckedInfo] = useState({})
  const [replyContent, setReplyContent] = useState(null)
  const [loginInUserInfo, setLoginInUserInfo] = useState(JSON.parse(localStorage.getItem('userInfoLogin')) || {})
  const [birthdayDate, setBirthdayDate] = useState(null)
  const [avatarImg, setAvatarImg] = useState(null)
  const [isDialog, setIsDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showMore, setShowMore] = useState(false)

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
        let dataArr = [...res.data.wishList || []]
        dataArr.length && dataArr.forEach((item, index) => {
          if (item.content.length > 61) {
            item.contentStr = item.content.slice(0, 61) + '...'
            item.isMore = true
            item.isMoreImg = false
          } else {
            item.isMoreImg = true
          }
        })
        setDataList(dataArr)
        setBirthdayDate(res.data.birthday || null)
        setAvatarImg(res.data.avatar || null)
        let datas = {
          userId: query.userId,
          userName: query.type == 1 ? query.userName : loginInUserInfo && loginInUserInfo.userName,
          year: res.data.birthday.split('-')[0]
        }
        setUserInfo(datas)
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
    let str = replyContent.replace(/ /g, "")
    if (!str) {
      message.error('回复内容不能为空')
      return
    }
    let wishIdList = []
    if (checkedName === '全部') {
      wishIdList = dataList.map(item => item.wishId)
    }
    let params = {
      wishIds: wishIdList.length ? wishIdList : [checkedInfo.wishId],
      content: replyContent
    }
    ReplyWish(params).then(res => {
      if (res.success) {
        message.success('回复成功')
        setReplyContent(null)
        setIsReplytoBoxVisible(false)
      }
    })
  }
  const checkedInput = (val) => {
    setReplyContent(val.target.value)
  }
  const sendWishClick = (val) => {
    setIsDialog(true)
  }
  const closeDialog = () => {
    setIsDialog(false)
    getWishListInfo(1)
  }
  const showMoreClick = (val, index) => {
    let dataArr = [...dataList]
    dataArr[index].isMoreImg = !val.isMoreImg
    setDataList(dataArr)
  }
  return (
    <div className={styles.blessingWall}>
      {/* style={{ background: `url(${birthdayBanner})` }} */}
      <div className={styles.bannerImg}>
        <img src={birthdayBanner} alt="" />
        <div>
          <p className={styles.birthdayImg}>
            <img src={query.type == 2 ? loginInUserInfo.headImage : avatarImg} alt="" />
          </p>
          <p className={styles.date}>
            {birthdayDate}
          </p>
        </div>
      </div>
      <p className={styles.name}>{
        query.type == 1 ?
          query.userName : loginInUserInfo && loginInUserInfo.userName} 生日快乐</p>
      {
        query.type == 2 && dataList.length ? <div className={styles.replyButton}>
          <Button type="primary" size="large" onClick={() => {
            setCheckedName("全部")
            setIsReplytoBoxVisible(true)
            setReplyContent(null)
          }}>回复全部</Button>
        </div> : <></>
      }
      {/* ta收到的祝福---无数据 */}
      {
        dataList.length ? <>
          <div className={styles.cardInfoContentBottm}>
            {
              dataList.length && dataList.map((item, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.cardImg}>
                    <img src={item.iconUrl} alt="" />
                  </div>
                  <div className={item.isMoreImg && item.isMore ? `${styles.cardMoreContent}` : `${styles.cardContent}`}>
                    <p className={styles.cardToName}>To：亲爱的{item.userName}</p>
                    <p className={styles.cardInfoContent}>
                      <span>
                        {item.isMoreImg ? item.content : item.contentStr}
                      </span>
                      {
                        item.isMore ? <img src={item.isMoreImg ? showUp : showDown} alt="" onClick={() => showMoreClick(item, index)} /> : <></>
                      }
                    </p>
                    <p className={styles.cardFromName}>From：{item.sendUserName}</p>
                  </div>
                  {
                    query.type == 2 ? <div className={styles.replyButton}>
                      <Button type="primary" size="small" onClick={() => handleClick(item, index)}>回复TA</Button>
                    </div> : <></>
                  }
                </div>
              ))
            }
          </div>
          {
            query.type == 1 ? <div className={styles.sendBlessingbutton}>
              <Button type="primary" size="large" onClick={() => sendWishClick()}>送祝福</Button>
            </div> : <></>
          }

        </> : <div className={styles.noContentInfo}>
            <p>
              {
                query.type == 1 ? <span>快来给TA送祝福吧～</span> : <img src={noContent} alt="" />
              }
            </p>
            {
              query.type == 2 ? <p>暂无数据</p> : <></>
            }
            {
              query.type == 1 ? <Button type="primary" size="large" onClick={() => sendWishClick()}>送祝福</Button> : <></>
            }
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
      <WishDialog userInfo={userInfo} isDialog={isDialog} closeDialog={closeDialog} />
    </div>
  )
}
export default BlessingWall