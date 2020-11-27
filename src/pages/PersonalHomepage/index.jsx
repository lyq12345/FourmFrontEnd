import React, { useEffect, useState } from 'react'
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
import { getMyRank, GetEmpInfo } from '@/api/personalHomepage'
import loginheadimg from '@/assets/img/login-head-img.png';


const PersonalHomepage = (props) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [personInfo, setPersonInfo] = useState({});
  const [detailInfo, setDetailInfo] = useState({});
  const [loginInUserInfo, setLoginInUserInfo] = useState(JSON.parse(localStorage.getItem('userInfoLogin')) || {})
  const [headImage, setHeadImage] = useState(loginheadimg);
  useEffect(() => {
    getMyRank({ userId: userInfo.account }).then(res => {
      if (res.success) {
        setPersonInfo(res.data[0])
      }
    })
    GetEmpInfo({ userId: userInfo.account }).then(res => {
      if (res.success) {
        setDetailInfo(res.EmpInfo)
      }
    })
    setHeadImage(loginInUserInfo && loginInUserInfo.headImage);
  }, [])
  const routerLink = () => {
    props.history.push({
      pathname: 'hall-something/detail',
    });
  }
  return (
    <div className={styles.personalHomepage}>
      <div className={styles.leftPersonalInfo}>
        <p>
          <img className={styles.headImg}
            onError={(e) => { e.target.onerror = null; e.target.src = loginheadimg }}
            src={
              (loginInUserInfo && loginInUserInfo.headImage) ||
              loginheadimg
            } alt="" />
        </p>
        <p className={styles.nameAndSex}>
          <span>{detailInfo && detailInfo.FItemName}</span>
          <img src={woman} alt="" />
        </p>
        <p className={styles.position}>{detailInfo && detailInfo.FPositionName}</p>
        <div className={styles.contentClassifie}>
          <div className={styles.classifie}>
            <img src={candyCurrency} alt="" />
            <p className={styles.classifieNum}>{(personInfo && personInfo.coinAll) || 0}</p>
            <p className={styles.classifieNum}>堂果币</p>
          </div>
          <div className={styles.classifie}>
            <img src={study} alt="" />
            <p className={styles.classifieNum}>{(detailInfo && detailInfo.FLearnTime) || 0}</p>
            <p className={`${styles.classifieNum}`}>
              <span className={styles.line}></span>
              <span className={styles.invitationText}>学习时长</span>
              <span className={styles.line}></span>
            </p>
          </div>
          <div className={styles.classifie}>
            <img src={invitation} alt="" />
            <p className={styles.classifieNum}>{(detailInfo && detailInfo.FPostNum) || 0}</p>
            <p className={styles.classifieNum}>帖子</p>
          </div>
        </div>
      </div>
      <div className={styles.rightFormInfo}>
        <FormData account={userInfo.account} />
      </div>
    </div >
  )
}
export default withRouter(PersonalHomepage)