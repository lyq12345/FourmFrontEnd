import React, { useState, useEffect } from 'react';
import { Tabs, Card, Row, Col, List, Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
const { TabPane } = Tabs;
import TopThree from './TopThree';
import styles from './style.less';

const RankingContent = (props) => {
  const [top3, setTop3] = useState([]);
  const [otherLeft, setOtherLeft] = useState([]);
  const [otherRight, setOtherRight] = useState([]);

  useEffect(() => {
    const arr = props.content;
    setTop3(arr.slice(0, 3));
    setOtherLeft(arr.slice(3, 7));
    setOtherRight(arr.slice(7));
  }, []);
  return (
    <Row>
      <Col style={{ margin: '-15px 0' }} span={10}>
        <TopThree content={props.content.slice(0, 3)} />
      </Col>

      <Col style={{ margin: '10px 0' }} span={7}>
        <ol style={{ padding: 0 }}>
          {otherLeft.map((item, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              <span className={styles.last7Num}>{index + 3}</span>
              <Avatar icon={<img src={myAvatar} />} />
              <span className={styles.last7Name}>{item.name}</span>
              <span className={styles.last7Num}>{item.amount}</span>
            </li>
          ))}
        </ol>
      </Col>
      <Col style={{ margin: '10px 0' }} span={7}>
        <ol>
          {otherRight.map((item, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              <span className={styles.last7Num}>{index + 8}</span>
              <Avatar icon={<img src={myAvatar} />} />
              <span className={styles.last7Name}>{item.name}</span>
              <span className={styles.last7Num}>{item.amount}</span>
            </li>
          ))}
        </ol>
      </Col>
    </Row>
  );
};

export default RankingContent;
