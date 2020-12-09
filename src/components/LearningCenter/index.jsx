import React, { useState, useEffect } from 'react'
import { Tabs, List } from 'antd';
import StudyHome from './components/StudyHome'
import { courseFront } from '@/api/studyCory';


import styles from './styles.less'


const { TabPane } = Tabs;
const LearningCenter = (props) => {

  const [myData, setMydata] = useState([]);
  const [currentKey, setKey] = useState('1');
  useEffect(() => {
    queryCategories()
  }, [])
  const queryCategories = (key) => {
    let param = {
      categoryId: '206a863d-953a-4fc7-bf52-95a134caf80a'
    }
    courseFront(param).then(res => {
      if (res.success) {
        setMydata(res.data || [])
      }
    })
  };
  return (
    <div className={styles.learningCenter}>
      <Tabs
        className={styles.studyTabs}
        defaultActiveKey="1"
        tabBarExtraContent={currentKey === '1' ? <a href="./nav-setting">设置</a> : null}
        onChange={(anctiveKey) => {
          setKey(anctiveKey);
          queryCategories(anctiveKey);
        }}
      >
        <TabPane
          disabled
          tab={
            <span
              style={{
                fontSize: '18px',
                color: '#333333',
                fontFamily: 'PingFangSC-Medium, PingFang SC',
                fontWeight: 500,
              }}
            >
              学习中心
            </span>
          }
          key="0"
        ></TabPane>
        <TabPane tab={<span>管理</span>} key="1">
          <StudyHome data={myData} />
        </TabPane>
        <TabPane tab={<span>销售</span>} key="4">
          <StudyHome data={myData} />
        </TabPane>
        <TabPane tab={<span>生产</span>} key="5">
          <StudyHome data={myData} />
        </TabPane>
        <TabPane tab={<span>IT</span>} key="6">
          <StudyHome data={myData} />
        </TabPane>
        <TabPane tab={<span>设计</span>} key="7">
          <StudyHome data={myData} />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default LearningCenter