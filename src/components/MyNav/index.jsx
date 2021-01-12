import React, { useState, useEffect } from 'react';
import { Tabs, List } from 'antd';
import styles from './style.less';
import NavHome from './components/NavHome';
import { GetSystems, GetAllMenu, GetMenuMy } from '@/api/navigation';

const { TabPane } = Tabs;

export default function Nav() {
  const [myData, setMydata] = useState([]);
  const [currentKey, setKey] = useState('1');
  const [specifiedTabs, setTabs] = useState([]);
  const [specifiedData, setSpeData] = useState({});
  useEffect(() => {
    GetMenuMy().then(({ success, data }) => {
      if (success) {
        setMydata(data);
      }
    });
    GetAllMenu().then(({ success, data }) => {
      if (success) {
        let tmp = [];
        data.forEach((item) => {
          tmp.push(item.classType);
        });
        let tabSet = new Set(tmp);
        let tabArray = [];
        Array.from(tabSet).forEach((item, index) => {
          tabArray.push({ title: item, activeKey: (index + 1).toString() });
        });
        setTabs(tabArray);
        const tmpObj = {};

        for (let t of tabArray) {
          for (let i of data) {
            if (i.classType === t.title) {
              let typeName = t.title;
              tmpObj[typeName] = tmpObj[typeName] || [];
              tmpObj[typeName].push(i);
            }
          }
        }
        setSpeData(tmpObj);
      }
    });
  }, []);
  // const queryCategories = (key) => {
  //   if (key === '1') {
  //     GetMenuMy().then(({ success, data }) => {
  //       if (success) {
  //         setMydata(data);
  //       }
  //     });
  //   } else {
  //     GetAllMenu({ id: key }).then(({ success, data }) => {
  //       if (success) {
  //         setMydata(data);
  //       }
  //     });
  //   }
  // };

  return (
    <div className={styles.tabsContainer}>
      <Tabs
        className={styles.navTabs}
        activeKey={currentKey}
        tabBarExtraContent={currentKey === '1' ? <a href="./nav-setting">设置</a> : null}
        onChange={(anctiveKey) => {
          setKey(anctiveKey);
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
        {specifiedTabs.map((item) =>
          item.title === '常用' ? (
            <TabPane tab={<span>{item.title}</span>} key={item.activeKey}>
              <NavHome data={myData} />
            </TabPane>
          ) : (
            <TabPane tab={<span>{item.title}</span>} key={item.activeKey}>
              <NavHome data={specifiedData[item.title]} />
            </TabPane>
          ),
        )}
      </Tabs>
    </div>
  );
}
