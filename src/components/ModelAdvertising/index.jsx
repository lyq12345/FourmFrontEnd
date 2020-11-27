import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Modal, Button } from 'antd';
import close from '@/assets/img/close.png';
import birthdayCard from '@/assets/img/birthday-card.png';
import buttonCardButtom from '@/assets/img/button-card-buttom.png';
import greetingCardClose from '@/assets/img/greeting-card-close.png';
import activeIcon from '@/assets/img/active-icon.png';
import moment from 'moment';
import Cookies from 'js-cookie';
import loginheadimg from '@/assets/img/login-head-img.png';
import anniversaryCelebration from '@/assets/img/anniversary-celebration.png';
const ModelAdvertising = (props) => {
  const [isAnniversaryVisible, setIsAnniversaryVisible] = useState(true)
  const [isBirthdayVisible, setIsBirthdayVisible] = useState(false)
  const [isAdvertVisible, setIsAdvertVisible] = useState(false)
  const [isBirthdayModel, setIsBirthdayModel] = useState(false)
  const [isAnniversaryModel, setIsAnniversaryModel] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [advertModel, setAdvertModel] = useState(false)
  const [loginUserInfo, setLoginUserInfo] = useState(JSON.parse(localStorage.getItem('userInfoLogin')) || {})
  const [headImg, setHeadImg] = useState(null)
  const [handleBuoyIcon, setHandleBuoyIcon] = useState(false)

  useEffect(() => {
    // info()
    judgeModel()
  }, [])
  const handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  const handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
  const closeModalFun = (val) => {
    // setIsVisible(false)
    if (val === 1) {
      setIsAdvertVisible(false)
      setIsVisible(false)
    }
    if (val === 2) {
      setIsBirthdayVisible(false)
      if ((loginUserInfo && loginUserInfo.advert) && !handleBuoyIcon) {
        setTimeout(() => {
          setIsAdvertVisible(true)
        }, 1000)
      } else {
        setIsVisible(false)
      }
    } else if (val === 3) {
      setIsAnniversaryVisible(false)
      if (loginUserInfo && loginUserInfo.isBirthday) {
        setTimeout(() => {
          setIsBirthdayVisible(true)
        }, 1000)
      } else {
        setIsVisible(false)
      }
    }
  }
  const handleBuoy = () => {
    setHandleBuoyIcon(true)
    setIsBirthdayVisible(true)
  }
  const judgeModel = () => {
    let params = {}
    if (JSON.parse(localStorage.getItem('userInfoLogin'))) {
      params = JSON.parse(localStorage.getItem('userInfoLogin'))
      setHeadImg(params.headImage)
    }
    const { isAnniversary, isBirthday, advert, userName } = params
    let refresh_tokenTs = JSON.parse(localStorage.getItem(`refresh_tokenTs`))
    let refresh_token = Cookies.get(`refresh_token`).replace(/\"/g, "")
    let dayData = localStorage.getItem(`todayData`)
    // let dayData = localStorage.getItem(`dayData`)
    let myData = moment().format("YYYY-MM-DD");
    console.log(refresh_tokenTs === refresh_token)
    if (refresh_tokenTs != refresh_token) {
      if (dayData != myData) {
        let data = {}
        if (isAnniversary || isBirthday || advert) {
          if (isAnniversary) {
            setIsAnniversaryModel(true)
            data.isAnniversaryOpend = true
            setIsAnniversaryVisible(true)
          } else if (isBirthday) {
            setIsBirthdayModel(true)
            setIsBirthdayVisible(true)
            data.isBirthday = true
          } else if (advertModel) {
            setAdvertModel(true)
            isAdvertVisible(isBirthdayVisible)
            // data.test = true
          }
          setIsVisible(true)
          localStorage.setItem(`refresh_tokenTs`, JSON.stringify(refresh_token));
          localStorage.setItem(`todayData`, JSON.stringify(myData));
        }
      }
    }
  }
  // const info = () => {
  //   Modal.info({
  //     title: '',
  //     icon: '',
  //     centered: true,
  //     footer: null,
  //     content: (
  //       <div>
  //         <p>some messages...some messages...</p>
  //         <p>some messages...some messages...</p>
  //       </div>
  //     ),
  //     // onOk() { },
  //   });
  // }
  return (
    <div className={styles.modelAdvertising}>
      {/* 广告 */}
      <Modal
        title=""
        visible={isAdvertVisible}
        closable={false}
        footer={null}
        wrapClassName='homeModalStyle'
        bodyStyle={{ background: 'initial' }}
        style={{ background: 'initial', top: '0', paddingBottom: '0' }}
        width='100%'
      >
        <div className={styles.moalComponent}>
          <div className={styles.modalAdvertisingContent}>
            <div className={styles.advertisingContent}>
              <span className={styles.backgroundCard}>
                <img src={loginUserInfo && loginUserInfo.advert} alt="" />
              </span>
              <span className={styles.buttomBtnCard} onClick={() => window.open(loginUserInfo && loginUserInfo.advertLink)}>
                <img src={buttonCardButtom} alt="" />
              </span>
            </div>
            <p className={styles.closeMoal}>
              <img src={close} alt="" onClick={() => closeModalFun(1)} />
            </p>
          </div>
        </div>
      </Modal>
      {/* 生日贺卡 */}
      <Modal
        title=""
        visible={isBirthdayVisible}
        closable={false}
        footer={null}
        wrapClassName='homeModalStyle'
        bodyStyle={{ background: 'initial' }}
        style={{ background: 'initial', top: '0', paddingBottom: '0' }}
        width='100%'
      >
        <div className={styles.cardContent}>
          <div className={styles.modelGreetingCardContent}>
            <div className={styles.dialogBackGround}>
              <img src={birthdayCard} alt="" />
              <span className={styles.closeModal} onClick={() => closeModalFun(2)}>
                <img src={greetingCardClose} alt="" />
              </span>
              <div className={styles.modalContent}>
                <img className={styles.headImg} src={headImg || loginheadimg}></img>
                <p className={styles.cardInfo}>亲爱的{loginUserInfo && loginUserInfo.userName}</p>
                <p className={styles.cardInfo}>生日快乐</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* 周年庆贺卡 */}
      <Modal
        title=""
        visible={isAnniversaryVisible}
        closable={false}
        footer={null}
        wrapClassName='homeModalStyle'
        bodyStyle={{ background: 'initial', padding: '0' }}
        width='100%'
      >
        <div className={styles.cardContent}>
          <div className={styles.modelGreetingCardContent}>
            <div className={styles.dialogBackGround}>
              <img src={birthdayCard} alt="" />
              <span className={styles.closeModal} onClick={() => closeModalFun(3)}>
                <img src={greetingCardClose} alt="" />
              </span>
              <div className={styles.modalContent}>
                <img className={styles.headImg} src={headImg || loginheadimg}></img>
                <p className={styles.cardInfo}>亲爱的{loginUserInfo && loginUserInfo.userName}</p>
                <p className={styles.cardInfo}>生日快乐</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {
        loginUserInfo.isBirthday && !isBirthdayVisible ?
          <div className={styles.footerActivity} onClick={() => handleBuoy()}>
            <img src={activeIcon} alt="" />
          </div> : <></>
      }
    </div >
  );
};
export default ModelAdvertising;
