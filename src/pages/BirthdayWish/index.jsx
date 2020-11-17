import React from 'react'
import { Tabs } from 'antd';

import TableList from './components/TableList'

import styles from './styles.less'

const { TabPane } = Tabs;
const BirthdayWishList = (props) => {
  return (
    <div className={styles.birthdayTabsContainer}>
      <Tabs
        className={styles.navTabs}
        defaultActiveKey="1"
        type='card'
      >
        <TabPane tab={<span>今天</span>} key="1">
          <TableList />
        </TabPane>
        <TabPane tab={<span>门户</span>} key="4">
          <TableList />
        </TabPane>
        <TabPane tab={<span>招聘</span>} key="5">
          <TableList />
        </TabPane>
        <TabPane tab={<span>报表</span>} key="6">
          <TableList />
        </TabPane>
        <TabPane tab={<span>采购</span>} key="7">
          <TableList />
        </TabPane>
        <TabPane tab={<span>考勤</span>} key="8">
          <TableList />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default BirthdayWishList