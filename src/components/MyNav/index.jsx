import React from 'react';
import { Tabs, List } from 'antd';
import styles from './style.less';
import NavHome from './components/NavHome';

const { TabPane } = Tabs;

export default function Nav() {
  return (
    <div className={styles.tabsContainer}>
      <Tabs
        className={styles.navTabs}
        defaultActiveKey="1"
        tabBarExtraContent={<a href="./nav-setting">设置</a>}
      >
        <TabPane
          tab={
            <span
              style={{
                fontSize: '18px',
                color: '#333333',
                fontFamily: 'PingFangSC-Medium, PingFang SC',
                fontWeight: 500,
              }}
            >
              我的导航
            </span>
          }
          key="1"
        >
          <NavHome />
        </TabPane>
        <TabPane tab={<span>HR</span>} key="2">
          HR
        </TabPane>
        <TabPane tab={<span>行政</span>} key="3">
          行政
        </TabPane>
        <TabPane tab={<span>财务</span>} key="4">
          财务
        </TabPane>
        <TabPane tab={<span>IT</span>} key="5">
          IT
        </TabPane>
        <TabPane tab={<span>法务</span>} key="6">
          法务
        </TabPane>
        <TabPane tab={<span>采购</span>} key="7">
          采购
        </TabPane>
        <TabPane tab={<span>党建</span>} key="8">
          党建
        </TabPane>
      </Tabs>
    </div>
  );
}
