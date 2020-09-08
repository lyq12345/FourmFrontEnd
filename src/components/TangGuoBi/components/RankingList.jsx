/*
 * @Author: your name
 * @Date: 2020-09-02 13:23:56
 * @LastEditTime: 2020-09-08 15:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/components/TangGuoBi/components/RankingList.jsx
 */
import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no1.png';
import No2 from '@/assets/img/no2.png';
import No3 from '@/assets/img/no3.png';
import avatar from '@/assets/img/avatar.jpg';
import RankingContent from './RankingContent';

const content = [];
for (let i = 0; i < 10; i++) {
  content.push({ name: '赵小赵', depart: '信息技术部', amount: '12345' });
}

export default function RankingList() {
  const handleChange = (key) => {
    console.log(key);
  };
  return (
    <div style={{ padding: '0 12px 12px 12px' }}>
      <Tabs type="card" defaultActiveKey="1" onChange={handleChange}>
        <TabPane tab="年度榜单" key="1">
          <RankingContent content={content} />
        </TabPane>
        <TabPane tab="上月榜单" key="2"></TabPane>
        <TabPane tab="本月榜单" key="3"></TabPane>
      </Tabs>
    </div>
  );
}
