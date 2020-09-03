import React from 'react';
import { Tabs, List } from 'antd';
import styles from './style.less';
import NavHome from './components/NavHome';

const { TabPane } = Tabs;

export default function Nav() {
  return (
    <div className={styles.tabsContainer}>
      <Tabs className={styles.navTabs} defaultActiveKey="1" tabBarExtraContent={<a>设置</a>}>
        <TabPane tab={<span style={{ fontSize: '20px' }}>我的导航</span>} key="1">
          <NavHome />
        </TabPane>
        <TabPane tab="HR" key="2">
          HR
        </TabPane>
        <TabPane tab="行政" key="3">
          行政
        </TabPane>
        <TabPane tab="财务" key="4">
          财务
        </TabPane>
        <TabPane tab="IT" key="5">
          IT
        </TabPane>
        <TabPane tab="法务" key="6">
          法务
        </TabPane>
        <TabPane tab="采购" key="7">
          采购
        </TabPane>
        <TabPane tab="党建" key="8">
          党建
        </TabPane>
      </Tabs>
    </div>
  );
}
