import React from 'react';
import { Row, Col } from 'antd';
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no1.png';
import No2 from '@/assets/img/no2.png';
import No3 from '@/assets/img/no3.png';
import avatar from '@/assets/img/avatar.jpg';
import styles from './style.less';

export default function TopThree(props) {
  return (
    <div style={{ display: 'inline-block' }}>
      <Row gutter={16}>
        <Col span={8} style={{ padding: 0 }}>
          <div
            style={{
              display: 'flex',
              background: `url(${Light})`,
              width: '140px',
              height: '140px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '-15px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundColor: '#aaa',
              }}
            >
              <img src={No1}></img>
            </div>
          </div>
          <div>
            <p className={styles.top3Name}>{props.content[0].name}</p>
            <p className={styles.top3Depart}>{props.content[0].depart}</p>
            <p className={styles.top3Amount}>{props.content[0].amount}</p>
          </div>
        </Col>
        <Col span={8} style={{ padding: 0 }}>
          <div
            style={{
              display: 'flex',
              width: '140px',
              height: '140px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '-15px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundColor: '#aaa',
              }}
            >
              <img src={No2}></img>
            </div>
          </div>
          <div>
            <p className={styles.top3Name}>{props.content[1].name}</p>
            <p className={styles.top3Depart}>{props.content[1].depart}</p>
            <p className={styles.top3Amount}>{props.content[1].amount}</p>
          </div>
        </Col>
        <Col span={8} style={{ padding: 0 }}>
          <div
            style={{
              display: 'flex',
              width: '140px',
              height: '140px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '-15px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundColor: '#aaa',
              }}
            >
              <img src={No3}></img>
            </div>
          </div>
          <div>
            <p className={styles.top3Name}>{props.content[2].name}</p>
            <p className={styles.top3Depart}>{props.content[2].depart}</p>
            <p className={styles.top3Amount}>{props.content[2].amount}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
