/*
 * @Author: your name
 * @Date: 2020-09-02 13:23:56
 * @LastEditTime: 2020-12-18 09:54:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/components/TangGuoBi/components/RankingList.jsx
 */
import React, { useEffect, useState } from 'react';
import { Tabs, Spin } from 'antd';
const { TabPane } = Tabs;
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no1.png';
import No2 from '@/assets/img/no2.png';
import No3 from '@/assets/img/no3.png';
import avatar from '@/assets/img/avatar.jpg';
import RankingContent from './RankingContent';
import { coinRankPaging, getPersonInfo } from '@/api/tangguobi';
import styles from './style.less';

export default function RankingList() {
  const [yearRank, setYearRank] = useState([]);
  const [lastMonthRank, setLastMonthRank] = useState([]);
  const [curMonthRank, setCurMonthRank] = useState([]);
  const { personCode } = JSON.parse(localStorage.getItem('userInfo'));
  const [personInfo, setPersonInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const lastMonth = date.getMonth();
    setLoading(true);
    getPersonInfo({ personCode }).then(({ success, data }) => {
      if (success) {
        setPersonInfo(data);
        coinRankPaging({ deptNumber: data.comCode }).then(({ success, data }) => {
          if (success) {
            const top10Data = data.records.slice(0, 10);
            setYearRank(top10Data);
            setLoading(false);
          }
        });

        // coinRankPaging({ month: lastMonth, deptNumber: data.comCode }).then(({ success, data }) => {
        //   if (success) {
        //     const top10Data = data.records.slice(0, 10);
        //     setLastMonthRank(top10Data);
        //   }
        // });
        // coinRankPaging({ month: currentMonth, deptNumber: data.comCode }).then(
        //   ({ success, data }) => {
        //     if (success) {
        //       const top10Data = data.records.slice(0, 10);
        //       setCurMonthRank(top10Data);
        //     }
        //   },
        // );
      }
    });
  }, []);

  const handleChange = (key) => {
    const date = new Date();
    const year = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const lastMonth = date.getMonth();
    switch (key) {
      case '1':
        setLoading(true);
        coinRankPaging({ deptNumber: personInfo.comCode }).then(({ success, data }) => {
          if (success) {
            const top10Data = data.records.slice(0, 10);
            setYearRank(top10Data);
            setLoading(false);
          }
        });
        break;
      case '2':
        setLoading(true);
        coinRankPaging({ month: lastMonth, deptNumber: personInfo.comCode }).then(
          ({ success, data }) => {
            if (success) {
              const top10Data = data.records.slice(0, 10);
              setLastMonthRank(top10Data);
              setLoading(false);
            }
          },
        );
        break;
      case '3':
        setLoading(true);
        coinRankPaging({ month: currentMonth, deptNumber: personInfo.comCode }).then(
          ({ success, data }) => {
            if (success) {
              const top10Data = data.records.slice(0, 10);
              setCurMonthRank(top10Data);
              setLoading(false);
            }
          },
        );
        break;
      default:
        return;
    }
  };
  return (
    <div className={styles.mainTabRankContainer} style={{ padding: '0 12px 12px 12px' }}>
      <Spin spinning={loading}>
        <Tabs
          type="card"
          defaultActiveKey="1"
          onChange={(anctiveKey) => {
            handleChange(anctiveKey);
          }}
        >
          <TabPane tab={<span className={styles['pane-label']}>年度榜单</span>} key="1">
            <RankingContent content={yearRank} />
          </TabPane>
          <TabPane tab={<span className={styles['pane-label']}>上月榜单</span>} key="2">
            <RankingContent content={lastMonthRank} />
          </TabPane>
          <TabPane tab={<span className={styles['pane-label']}>本月榜单</span>} key="3">
            <RankingContent content={curMonthRank} />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
}
