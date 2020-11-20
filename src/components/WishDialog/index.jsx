import React from 'react'
import { Modal, Button, Input } from 'antd';


import styles from './styles.less'

const { TextArea } = Input;
const WishDialog = () => {
  return (
    <div className={styles.wishDialog}>
      <Modal
        title="Basic Modal"
        wrapClassName={styles.wishModal}
        visible={false}
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
                <img src="" alt="" />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardToName}>To:11</p>
                <p className={styles.cardInfoContent}>22</p>
                <p className={styles.cardFromName}>From:44</p>
              </div>
            </div>
            {/* 右边输入信息 */}
            <div className={styles.righttoInfoContent}>
              <p>TO：<span>亲爱的</span><span>王佳佳</span><span>产品管理部</span></p>
              <div className={styles.blessing}>
                <TextArea
                  style={{ width: '768px', height: '134px', backgroundColor: '#F9F9F9', resize: 'none' }}
                  className={styles.textAreaSyles}
                  maxLength={100} />
                <span className={styles.textAreaNumber}>0/100</span>
              </div>
              <div className={styles.wishImgList}>
                <p>
                  {/* <img src="" alt=""/> */}
                </p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
          {/* 默认祝福词汇 */}
          <div className={styles.defaultBlessing}>

          </div>
        </div>
      </Modal>
    </div>
  )
}
export default WishDialog