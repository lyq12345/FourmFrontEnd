import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import styles from './style.less';
import PostCreator from '../components/PostCreator/PostCreator';
import { requestLatestPosts } from '../api';
import NormalPostList from '../components/NormalPostList';

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
