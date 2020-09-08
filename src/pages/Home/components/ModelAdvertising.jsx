import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Modal, Button } from 'antd';
import close from '@/assets/img/close.png';
const ModelAdvertising = (props) => {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    // info()
  }, [])
  const handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
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
        style={{ background: 'initial' }}
        width={767}
      >
        <div className={styles.moalComponent}>
          <div className={styles.modalContent}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
          <p className={styles.closeMoal}>
            <img src={close} alt="" />
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default ModelAdvertising;
