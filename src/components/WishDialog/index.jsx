import React, { useState, useEffect } from 'react'
import { Modal, Button, Input, message } from 'antd';
import rotate from '@/assets/img/rotate.png'
import close from '@/assets/img/closeDialog.png'
import { AddWish, GetWishIconList } from '@/api/birthdayWish'
import SwiperCore, { Autoplay } from 'swiper';
import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperComponent from '@/components/Swiper/Swiperv'


import styles from './styles.less'

const { TextArea } = Input;
SwiperCore.use([Autoplay]);
const WishDialog = (props) => {
  const [replyContent, setReplyContent] = useState(null)
  const [isRefresh, setIsRefresh] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [loginInUserInfo, setLoginInUserInfo] = useState(JSON.parse(localStorage.getItem('userInfoLogin')) || {})
  const [iconList, setIconList] = useState([])
  const [templateList, setTemplateList] = useState([])
  const [selectShowIcon, setSelectShowIcon] = useState({})
  const [swiper, setSwiper] = useState(null);

  const { userInfo, isDialog, closeDialog = () => { } } = props
  const handleChange = (val) => {
    setReplyContent(val.target.value)
  }
  const refresh = () => {
    setIsRefresh(true)
    setTimeout(() => {
      setIsRefresh(false)
      swiper.slideNext()
      // swiper.slidePrev()
    }, 1000)
  }
  // const handleClose = () => {
  //   setIsVisible(false)
  // }
  useEffect(() => {
    setIsVisible(isDialog)
    if (!isDialog) {
      return
    }
    setIsVisible(isDialog)
    GetWishIconList().then(res => {
      if (res.success) {
        setIconList(res.data.iconList || [])
        setTemplateList(res.data.templateList || [])
        setSelectShowIcon(res.data.iconList[0] || {})
        setReplyContent(res.data.templateList[0][0] || null)
      }
    })
  }, [isDialog])
  const selectedIconClick = (val, index) => {
    let dataArr = [...iconList]
    dataArr.forEach((item, _index) => {
      if (index === _index) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
    })
    setIconList(dataArr)
    setSelectShowIcon({
      iconUrl: val.iconUrl,
      iconNo: val.iconNo
    })
  }
  const templateClick = (val, index) => {
    setReplyContent(val)
  }
  const handleClick = () => {
    let param = {
      userId: userInfo.userId,
      year: userInfo.year,
      content: replyContent,
      icon: selectShowIcon.iconNo
    }
    AddWish(param).then(res => {
      if (res.success) {
        message.success('祝福发送成功')
        closeDialog()
      }
    })
  }
  return (
    <div className={styles.wishDialog}>
      <Modal
        title="Basic Modal"
        wrapClassName={styles.wishModal}
        visible={isVisible}
        bodyStyle={{ background: 'initial', padding: 0 }}
        closable={false}
        footer={null}
        title=""
        width={1080}
      >
        <div className={styles.modelInfo}>
          <div className={styles.wishInfo}>
            {/* 左边图片to/from */}
            <div className={styles.leftInfoContent}>
              <div className={styles.cardImg}>
                <img src={selectShowIcon.iconUrl} alt="" />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardToName}>To：亲爱的{userInfo && userInfo.userName}</p>
                <p className={styles.cardInfoContent}>{replyContent}</p>
                <p className={styles.cardFromName}>From：{loginInUserInfo && loginInUserInfo.userName}</p>
              </div>
            </div>
            {/* 右边输入信息 */}
            <div className={styles.righttoInfoContent}>
              <div className={styles.contentHerder}>
                <p>TO：<span>亲爱的</span><span>{userInfo && userInfo.userName}</span><span> {userInfo && userInfo.deptName}</span></p>
                <p onClick={() => closeDialog()}>
                  <img src={close} alt="" />
                </p>
              </div>
              <div className={styles.blessing}>
                <TextArea
                  style={{ width: '768px', height: '134px', backgroundColor: '#F9F9F9', resize: 'none' }}
                  className={styles.textAreaSyles}
                  value={replyContent}
                  onChange={(e) => handleChange(e)}
                  maxLength={100} />
                <span className={styles.textAreaNumber}>{replyContent && replyContent.length || 0}/100</span>
              </div>
              <div className={styles.wishImgList}>
                {
                  iconList.length && iconList.map((item, index) => (
                    <p key={index} className={item.isCheck ? `${styles.dayCheck}` : ""} onClick={() => selectedIconClick(item, index)}>
                      <img src={item.iconUrl} alt="" />
                    </p>
                  ))
                }
              </div>
            </div>
          </div>
          {/* 默认祝福词汇 */}
          <div className={styles.defaultBlessingContent}>
            <div>
              {
                templateList && templateList.length ?
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    // direction='vertical'
                    onSwiper={(swiper) => setSwiper(swiper)}
                    // autoplay={{ delay: 5000 }}
                    loop
                  >
                    {
                      templateList && templateList.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div key={index} className={styles.defaultBlessing}>
                            {
                              item.map((val, _index) => (
                                <p key={_index} title={val} onClick={() => templateClick(val, _index)}>{val}</p>
                              ))
                            }
                          </div>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper> : <></>
              }

            </div>
            <div className={styles.update} onClick={() => refresh()}>
              <img src={rotate} className={isRefresh ? styles.refreshImg : ''} alt="" />
              <span>换一换</span>
            </div>
          </div>
          <div className={styles.wishButton}>
            <Button type="primary" onClick={() => handleClick()}>送祝福</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default WishDialog