import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import styles from './style.less';
import PostCreator from '../components/PostCreator/PostCreator';
import NormalPost from '../components/NormalPost/NormalPost';

const Index = () => {
  return (
    <div>
      <PostCreator />
      <Tabs className={styles.tab} defaultActiveKey="1" centered>
        <TabPane tab={<span>最新</span>} key="1">
          <NormalPost />
          <NormalPost />
        </TabPane>
        <TabPane tab={<span>最热</span>} key="2"></TabPane>
        <TabPane tab={<span>我的关注</span>} key="3"></TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
