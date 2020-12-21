import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import newStudy from '@/assets/img/new-study.png';
import hotStudy from '@/assets/img/hot-study.png';
import styles from './styles.less'
import Cookies from 'js-cookie';

// const data = [
//   { courseName: '集团邮箱', icon: '', href: '' },
//   { courseName: '流程中心', icon: '', href: '' },
//   { courseName: '考勤系统', icon: '', href: '' },
//   { courseName: 'IMS业务系统', icon: '', href: '' },
//   { courseName: '招聘系统', icon: '', href: '' },
//   { courseName: '会议室预定', icon: '', href: '' },
//   { courseName: '添加', icon: '', href: '' },
// ];


const StudyHome = (props) => {
  const accessToken = Cookies.get('access_token');
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    console.log(props)
    // info()
  }, [])
  // const info = () => {
  //   let param = {
  //     categoryId: '206a863d-953a-4fc7-bf52-95a134caf80a'
  //   }
  //   courseFront(param).then(res => {
  //     if (res.success) {
  //       setDataList(res.data)
  //     }
  //   })
  // }
  return (
    <div className={styles.studyHome}>
      <List
        dataSource={props.data}
        grid={{ column: 2 }}
        loading={props.listLoading}
        renderItem={(item) => (
          <div className={styles.studyContent} onClick={() => window.open(`https://hr-elearning.yst.com.cn/#/study/course/detail/${item.courseID}&access_token=${accessToken}`)}>
            <div className={styles.leftStudyImg}>
              <img src={`https://hr-elearning.yst.com.cn/${item.coverPath}`} alt="" />
            </div>
            <div className={styles.rightStudyContentInfo}>
              <img src={item.hotOrNew == 1 ? hotStudy : newStudy} alt="" />
              <p className={styles.title}>{item.courseName}</p>
              <p className={styles.intro}>{item.studyMemberCount}加入学习</p>
            </div>
          </div>
        )}
      />
      {/* {
        props.data && props.data.length && props.data.map((item, index) => (
          <div className={styles.studyContent} key={index} onClick={() => window.open(`https://hr-elearning.yst.com.cn/#/study/subject/detail/${item.courseID}`)}>
            <div className={styles.leftStudyImg}>
              <img src={`https://hr-elearning.yst.com.cn/${item.coverPath}`} alt="" />
            </div>
            <div className={styles.rightStudyContentInfo}>
              <img src={item.hotOrNew === 1 ? hotStudy : newStudy} alt="" />
              <p className={styles.title}>{item.courseName}</p>
              <p className={styles.intro}>{item.studyMemberCount}加入学习</p>
            </div>
          </div>
        ))
      } */}
    </div>
  )
}
export default StudyHome
