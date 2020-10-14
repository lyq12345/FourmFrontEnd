import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Modal, Button } from 'antd';
import close from '@/assets/img/close.png';
import birthdayCard from '@/assets/img/birthday-card.png';
import buttonCardButtom from '@/assets/img/button-card-buttom.png';
import greetingCardClose from '@/assets/img/greeting-card-close.png';
const ModelAdvertising = (props) => {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    // info()
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
  const closeModalFun = () => {
    setIsVisible(false)
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
      <Modal
        title=""
        visible={isVisible}
        closable={false}
        footer={null}
        wrapClassName='homeModalStyle'
        bodyStyle={{ background: 'initial' }}
        style={{ background: 'initial', top: '0', paddingBottom: '0' }}
        width='100%'
      >
        {/* 广告 */}
        <div className={styles.moalComponent}>
          <div className={styles.modalAdvertisingContent}>
            <p className={styles.backgroundCard}>
              <img src={birthdayCard} alt="" />
            </p>
            <p className={styles.buttomBtnCard} onClick={() => window.open('https://ant-design.gitee.io/components/modal-cn/')}>
              < img src={buttonCardButtom} alt="" />
            </p>
          </div>
          <p className={styles.closeMoal}>
            <img src={close} alt="" />
          </p>
        </div>
        {/* 生日/周年庆贺卡 */}
        {/* <div className={styles.modelGreetingCardContent}>
          <img src={birthdayCard} alt="" />
          <p className={styles.closeModal} onClick={() => closeModalFun()}>
            <img src={greetingCardClose} alt="" />
          </p>
          <div className={styles.modalContent}>
            <span></span>
            <p>亲爱的王佳佳</p>
            <p>生日快乐</p>
          </div>
        </div> */}
      </Modal>
    </div >
  );
};
export default ModelAdvertising;
