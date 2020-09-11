/*
 * @Author: your name
 * @Date: 2020-09-02 13:23:56
 * @LastEditTime: 2020-09-11 13:36:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/components/TangGuoBi/components/RankingList.jsx
 */
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no1.png';
import No2 from '@/assets/img/no2.png';
import No3 from '@/assets/img/no3.png';
import avatar from '@/assets/img/avatar.jpg';
import RankingContent from './RankingContent';
import { coinRankPaging, getPersonInfo } from '@/api/tangguobi';
import styles from './style.less';

const content = [];
for (let i = 0; i < 10; i++) {
  content.push({ name: '赵小赵', depart: '信息技术部', amount: '12345' });
}

export default function RankingList() {
  const [yearRank, setYearRank] = useState([]);
  const [lastMonthRank, setLastMonthRank] = useState([]);
  const [curMonthRank, setCurMonthRank] = useState([]);
  const { personCode } = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const lastMonth = currentMonth;
    getPersonInfo({ personCode }).then(({ success, data }) => {
      if (success) {
        coinRankPaging({ deptNumber: data.comCode }).then(({ success, data }) => {
          if (success) {
            const top10Data = data.records.slice(0, 10);
            setYearRank(top10Data);
          }
        });
        coinRankPaging({ month: currentMonth, deptNumber: data.comCode }).then(
          ({ success, data }) => {
            if (success) {
              const top10Data = data.records.slice(0, 10);
              setCurMonthRank(top10Data);
            }
          },
        );
        coinRankPaging({ month: lastMonth, deptNumber: data.comCode }).then(({ success, data }) => {
          if (success) {
            const top10Data = data.records.slice(0, 10);
            setLastMonthRank(top10Data);
          }
        });
      }
    });
  }, []);

  const handleChange = (key) => {
    console.log(key);
  };
  return (
    <div className={styles.mainTabRankContainer} style={{ padding: '0 12px 12px 12px' }}>
      <Tabs type="card" defaultActiveKey="1" onChange={handleChange}>
        <TabPane tab="年度榜单" key="1">
          <RankingContent content={yearRank} />
        </TabPane>
        <TabPane tab="上月榜单" key="2">
          <RankingContent content={lastMonthRank} />
        </TabPane>
        <TabPane tab="本月榜单" key="3">
          <RankingContent content={curMonthRank} />
        </TabPane>
      </Tabs>
    </div>
  );
}
