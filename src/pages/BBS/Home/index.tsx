import { Tabs } from 'antd';
import React from 'react';
import { requestHottestPosts, requestLatestPosts, requestSharePosts } from '../api';
import NormalPostList from '../components/NormalPostList';
import PostCreator from '../components/PostCreator/PostCreator';
import styles from './style.less';
const { TabPane } = Tabs;

const list = [
  {
    title: '最新',
    requestFn: requestLatestPosts,
  },
  {
    title: '最热',
    requestFn: requestHottestPosts,
  },
  {
    title: '我的关注',
    requestFn: requestSharePosts,
  },
];

const Index = () => {
  const [currentKey, setCurrentKey] = React.useState('0');

  return (
    <div>
      <PostCreator />
      <Tabs
        className={styles.tab}
        centered
        destroyInactiveTabPane
        onChange={(key) => setCurrentKey(key)}
        activeKey={currentKey}
      >
        {list.map((v, i) => {
          return (
            <TabPane tab={<span>{v.title}</span>} key={i}>
              <NormalPostList requestFn={v.requestFn} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Index;
