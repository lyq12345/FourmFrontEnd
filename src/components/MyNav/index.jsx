import React, { useState, useEffect } from 'react';
import { Tabs, List } from 'antd';
import styles from './style.less';
import NavHome from './components/NavHome';
import { GetSystems, GetAllMenu, GetMenuMy } from '@/api/navigation';

const { TabPane } = Tabs;

export default function Nav() {
  const [myData, setMydata] = useState([]);
  const [currentKey, setKey] = useState('1');
  useEffect(() => {
    GetMenuMy().then(({ success, data }) => {
      if (success) {
        setMydata(data);
      }
    });
  }, []);
  const queryCategories = (key) => {
    if (key === '1') {
      GetMenuMy().then(({ success, data }) => {
        if (success) {
          setMydata(data);
        }
      });
    } else {
      GetAllMenu({ id: key }).then(({ success, data }) => {
        if (success) {
          setMydata(data);
        }
      });
    }
  };
  return (
    <div className={styles.tabsContainer}>
      <Tabs
        className={styles.navTabs}
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
              我的导航
            </span>
          }
          key="0"
        ></TabPane>
        <TabPane tab={<span>常用</span>} key="1">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>门户</span>} key="4">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>招聘</span>} key="5">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>报表</span>} key="6">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>采购</span>} key="7">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>考勤</span>} key="8">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>绩效</span>} key="9">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>问卷</span>} key="10">
          <NavHome data={myData} />
        </TabPane>
        <TabPane tab={<span>审计</span>} key="11">
          <NavHome data={myData} />
        </TabPane>
      </Tabs>
    </div>
  );
}
