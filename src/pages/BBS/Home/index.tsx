import { Tabs } from 'antd';
import React from 'react';
import { requestLatestPosts } from '../api';
import NormalPostList from '../components/NormalPostList';
import PostCreator from '../components/PostCreator/PostCreator';
import styles from './style.less';
const { TabPane } = Tabs;

const Index = () => {
  return (
    <div>
      <PostCreator />
      <Tabs className={styles.tab} centered destroyInactiveTabPane>
        <TabPane tab={<span>最新</span>} key="1">
          <NormalPostList requestFn={requestLatestPosts} />
        </TabPane>
        <TabPane tab={<span>最热</span>} key="2">
          <NormalPostList requestFn={requestLatestPosts} />
        </TabPane>
        <TabPane tab={<span>我的关注</span>} key="3">
          <NormalPostList requestFn={requestLatestPosts} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
