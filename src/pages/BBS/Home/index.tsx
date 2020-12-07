import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import styles from './style.less';
import PostCreator from '../components/PostCreator/PostCreator';
import NormalPost from '../components/NormalPost/NormalPost';
import { Post, requestLatestPosts } from '../api';
import { useInViewport, useUpdateEffect } from 'ahooks';

const Index = () => {
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [activeKey, setActiveKey] = useState<1 | 2 | 3>(1);
  const handleTabChange = useCallback((activeKey) => {
    setPage(1);
    setActiveKey(activeKey);
  }, []);
  useEffect(() => {
    requestLatestPosts(page)
      .then((res) => {
        if (page === 1) {
          setData(res.data.threads);
        } else {
          setData((data) => data.concat(res.data.threads));
        }
      })
      .catch();
  }, [page, activeKey]);
  const inViewport = useInViewport(() => document.querySelector('#bbs-footer'));
  useUpdateEffect(() => {
    setPage((c) => c + 1);
  }, [inViewport]);

  return (
    <div>
      <PostCreator />
      <Tabs className={styles.tab} defaultActiveKey="1" centered onChange={handleTabChange}>
        <TabPane tab={<span>最新</span>} key="1">
          {data.map((v) => (
            <NormalPost key={v.threadId} post={v} />
          ))}
        </TabPane>
        <TabPane tab={<span>最热</span>} key="2">
          {data.map((v) => (
            <NormalPost key={v.threadId} post={v} />
          ))}
        </TabPane>
        <TabPane tab={<span>我的关注</span>} key="3">
          {data.map((v) => (
            <NormalPost key={v.threadId} post={v} />
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
