import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import NormalArticle from './components/NormalArticle';
import PostArticle from './components/PostArticle';

const Index = () => {
  return (
    <div>
      <PostArticle />
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={<span>最新</span>} key="1">
          <NormalArticle />
        </TabPane>
        <TabPane tab={<span>最热</span>} key="2">
          <NormalArticle />
        </TabPane>
        <TabPane tab={<span>我的关注</span>} key="3">
          <NormalArticle />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
