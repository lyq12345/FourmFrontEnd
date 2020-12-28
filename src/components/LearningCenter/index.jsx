import React, { useState, useEffect } from 'react'
import { Tabs, List } from 'antd';
import StudyHome from './components/StudyHome'
import { courseFront } from '@/api/studyCory';


import styles from './styles.less'


const { TabPane } = Tabs;
const LearningCenter = (props) => {

  const [myData, setMydata] = useState([]);
  const [currentKey, setKey] = useState('1');
  const [listLoading, setListLoading] = useState(false)
  useEffect(() => {
    queryCategories('b6fb7d3d-d700-4fa4-8435-a32e2b6f3e77')
  }, [])
  const queryCategories = (key) => {
    let param = {
      categoryId: key
    }
    setListLoading(true)
    courseFront(param).then(res => {
      setListLoading(false)
      if (res.success) {
        setMydata(res.data || [])
      }
    })
  };
  return (
    <div className={styles.learningCenter}>
      <Tabs
        className={styles.studyTabs}
        defaultActiveKey="b6fb7d3d-d700-4fa4-8435-a32e2b6f3e77"
        tabBarExtraContent={<a href="https://hr-elearning.yst.com.cn/#/home" target="view_window">更多</a>}
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
                fontWeight: 600,
                lineHeight: '18px'
              }}
            >
              学习中心
            </span>
          }
          key="0"
        ></TabPane>
        <TabPane tab={<span>制度文化</span>} key="b6fb7d3d-d700-4fa4-8435-a32e2b6f3e77">
          <StudyHome data={myData} listLoading={listLoading} />
        </TabPane>
        <TabPane tab={<span>通用技能</span>} key="4002ec94-ae7f-484d-b7e1-10ce56ad55d5">
          <StudyHome data={myData} listLoading={listLoading} />
        </TabPane>
        <TabPane tab={<span>管理</span>} key="158301c8-b327-4cff-a894-7484abd9963f">
          <StudyHome data={myData} listLoading={listLoading} />
        </TabPane>
        <TabPane tab={<span>专业</span>} key="79cbe1e1-eec6-4d6d-9470-2923ec68727e">
          <StudyHome data={myData} listLoading={listLoading} />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default LearningCenter