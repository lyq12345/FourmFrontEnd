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
  return (
    <div className={styles.studyHome}>
      <List
        dataSource={props.data}
        grid={{ column: 2 }}
        loading={props.listLoading}
        renderItem={(item) => (
          <div className={styles.studyContent} onClick={() => window.open(`https://hr-elearning.yst.com.cn/#/study/course/detail/${item.courseID}&access_token=${accessToken}&token_type=Bearer&expires_in=86400`)}>
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
    </div>
  )
}
export default StudyHome
