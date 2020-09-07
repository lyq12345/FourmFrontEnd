import React, { useEffect } from 'react'
import styles from './styles.less'
import ListData from '@/components/ListData'
import { Pagination } from 'antd';
import { withRouter } from 'umi';
import woman from '@/assets/img/woman.png';
import man from '@/assets/img/man.png';
import FormData from './components/FormData';
import study from '@/assets/img/study.png';
import invitation from '@/assets/img/invitation.png';
import candyCurrency from '@/assets/img/candy-currency.png';

const PersonalHomepage = (props) => {

  useEffect(() => {

  }, [])
  const routerLink = () => {
    props.history.push({
      pathname: '/hall-something/detail',
    });
  }
  return (
    <div className={styles.personalHomepage}>
      <div className={styles.leftPersonalInfo}>
        <p>
          <span className={styles.headImg}></span>
        </p>
        <p className={styles.nameAndSex}>
          <span>王佳佳</span>
          <img src={woman} alt="" />
        </p>
        <p className={styles.position}>产品分析师</p>
        <div className={styles.contentClassifie}>
          <div className={styles.classifie}>
            <img src={candyCurrency} alt="" />
            <p className={styles.classifieNum}>3500</p>
            <p className={styles.classifieNum}>糖果币</p>
          </div>
          <div className={styles.classifie}>
            <img src={study} alt="" />
            <p className={styles.classifieNum}>380</p>
            <p className={`${styles.classifieNum}`}>
              <span className={styles.line}></span>
              <span className={styles.invitationText}>学习时长</span>
              <span className={styles.line}></span>
            </p>
          </div>
          <div className={styles.classifie}>
            <img src={invitation} alt="" />
            <p className={styles.classifieNum}>1</p>
            <p className={styles.classifieNum}>帖子</p>
          </div>
        </div>
      </div>
      <div className={styles.rightFormInfo}>
        <FormData />
      </div>
    </div >
  )
}
export default withRouter(PersonalHomepage)