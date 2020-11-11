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
const ModelAdvertising = (props) => {
  const [isAnniversaryVisible, setIsAnniversaryVisible] = useState(false)
  const [isBirthdayVisible, setIsBirthdayVisible] = useState(false)
  const [isTestVisible, setIsTestVisible] = useState(false)
  const [isBirthdayModel, setIsBirthdayModel] = useState(false)
  const [isAnniversaryModel, setIsAnniversaryModel] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [testModel, setTestModel] = useState(false)
  const { isAnniversary, isBirthday, test, userName, headImage } = JSON.parse(localStorage.getItem('userInfoLogin'))
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
      setIsTestVisible(false)
      setIsVisible(false)
    }
    if (val === 2) {
      setIsBirthdayVisible(false)
      if (test) {
        setTimeout(() => {
          setIsTestVisible(true)
        }, 1000)
      } else {
        setIsVisible(false)
      }
    } else {
      setIsAnniversaryVisible(false)
      if (isBirthday) {
        setTimeout(() => {
          setIsBirthdayVisible(true)
        }, 1000)
      } else {
        setIsVisible(false)
      }
    }
  }
  const handleBuoy = () => {
    setIsBirthdayVisible(true)
  }
  const judgeModel = () => {
    let refresh_tokenTs = JSON.parse(localStorage.getItem(`refresh_tokenTs`))
    let refresh_token = Cookies.get(`refresh_token`).replace(/\"/g, "")
    let dayData = localStorage.getItem(`todayData`)
    // let dayData = localStorage.getItem(`dayData`)
    let myData = moment().format("YYYY-MM-DD");
    console.log(refresh_tokenTs === refresh_token)
    if (refresh_tokenTs != refresh_token) {
      if (dayData != myData) {
        let data = {}
        if (isAnniversary || isBirthday || test) {
          if (isAnniversary) {
            setIsAnniversaryModel(true)
            data.isAnniversaryOpend = true
            setIsAnniversaryVisible(true)
          } else if (isBirthday) {
            setIsBirthdayModel(true)
            isBirthdayVisible(isBirthdayVisible)
            data.isBirthday = true
          } else if (testModel) {
            setTestModel(true)
            isTestVisible(isBirthdayVisible)
            data.test = true
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
        visible={isTestVisible}
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
                <img src={birthdayCard} alt="" />
              </span>
              <span className={styles.buttomBtnCard} onClick={() => window.open('https://ant-design.gitee.io/components/modal-cn/')}>
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
                <img className={styles.headImg} src={headImage}></img>
                <p className={styles.cardInfo}>亲爱的{userName}</p>
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
        bodyStyle={{ background: 'initial' }}
        style={{ background: 'initial', top: '0', paddingBottom: '0' }}
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
                <p className={styles.headImg} src={headImage}></p>
                <p className={styles.cardInfo}>亲爱的{userName}</p>
                <p className={styles.cardInfo}>生日快乐</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {
        !isVisible ?
          <div className={styles.footerActivity} onClick={() => handleBuoy()}>
            <img src={activeIcon} alt="" />
          </div> : <></>
      }
    </div >
  );
};
export default ModelAdvertising;
