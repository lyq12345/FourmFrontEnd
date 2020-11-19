import React, { useState, useEffect } from 'react';
import { Tabs, List } from 'antd';
import styles from './style.less';
import NavHome from './components/NavHome';
import { GetSystems, GetAllMenu, GetMenuMy } from '@/api/navigation';

const { TabPane } = Tabs;

const specifiedTabs = [
  { title: '常用', key: '1', active:true },
  { title: '门户', key: '4', active:false },
  { title: '招聘', key: '5', active:false },
  { title: '报表', key: '6' , active:false},
  { title: '采购', key: '7' , active:false},
  { title: '考勤', key: '8', active:false },
  { title: '绩效', key: '9' , active:false},
  { title: '问卷', key: '10', active:false },
  { title: '审计', key: '11', active:false },
];

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
                cursor: 'default',
                fontSize: '18px',
                color: '#333333',
                fontFamily: 'PingFangSC-Medium, PingFang SC',
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              我的导航
            </span>
          }
          key="0"
        ></TabPane>
        {specifiedTabs.map((item) => (
          <TabPane tab={<span>{item.title}</span>} key={item.key}>
            <NavHome data={myData} />
          </TabPane>
        ))}
        {/* <TabPane tab={<span style={{ color: '#CE1925' }}>常用</span>} key="1">
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
        </TabPane> */}
      </Tabs>
    </div>
  );
}
