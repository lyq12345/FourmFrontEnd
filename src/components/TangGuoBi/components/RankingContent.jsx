import React, { useState, useEffect } from 'react';
import { Tabs, Card, Row, Col, List, Avatar, Spin } from 'antd';
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
  }, [props.content]);
  return (
    <div style={{ paddingTop: '10px', backgroundColor: '#FAFAFA' }}>
      <Row>
        <Col
          style={
            props.content.length <= 3 ? { margin: '10px 0' } : { margin: '-15px -5px -15px 0' }
          }
          span={12}
        >
          <TopThree content={top3} />
        </Col>

        <Col style={{ margin: '10px 0' }} span={6}>
          <ol style={{ padding: 0 }}>
            {otherLeft.map((item, index) => (
              <li key={index} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className={styles.last7Order}>{item.coinOrder}</span>
                <Avatar icon={<img src={item.avatar} />} />
                <span className={styles.last7Name}>{item.personName}</span>
                <span className={styles.last7Num}>{item.coin}</span>
              </li>
            ))}
          </ol>
        </Col>
        <Col style={{ margin: '10px 0' }} span={6}>
          <ol style={{ padding: 0 }}>
            {otherRight.map((item, index) => (
              <li
                key={index}
                style={{ margin: '10px 0 10px 20px', display: 'flex', alignItems: 'center' }}
              >
                <span className={styles.last7Order}>{item.coinOrder}</span>
                <Avatar icon={<img src={item.avatar} size={30} />} />
                <span className={styles.last7Name}>{item.personName}</span>
                <span className={styles.last7Num}>{item.coin}</span>
              </li>
            ))}
          </ol>
        </Col>
      </Row>
    </div>
  );
};

export default RankingContent;
