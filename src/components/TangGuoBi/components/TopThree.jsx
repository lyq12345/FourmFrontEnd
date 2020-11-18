import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no1.png';
import No2 from '@/assets/img/no2.png';
import No3 from '@/assets/img/no3.png';
import avatar from '@/assets/img/avatar.jpg';
import styles from './style.less';

export default function TopThree(props) {
  const [top3, setTop3] = useState([]);
  const arr = props.content;

  useEffect(() => {
    setTop3(arr);
  }, [arr]);
  return (
    <div style={{ display: 'inline-block' }}>
      <Row>
        <Col span={8} style={{ padding: 0, marginRight: '-5px' }}>
          <div
            style={{
              display: 'flex',
              background: `url(${Light})`,
              width: '125px',
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
                backgroundImage: `url(${top3[0] ? top3[0].avatar : ''})`,
                backgroundSize: '80px 80px',
                backgroundColor: '#aaa',
              }}
            >
              <img src={No1}></img>
            </div>
          </div>
          <div>
            <p className={styles.top3Name}>{top3[0] ? top3[0].personName : ''}</p>
            <p title={top3[0] ? top3[0].deptName : ''} className={styles.top3Depart}>
              {top3[0] ? top3[0].deptName : ''}
            </p>
            <p className={styles.top3Amount}>{top3[0] ? top3[0].coin : ''}</p>
          </div>
        </Col>
        <Col span={8} style={{ padding: 0, marginRight: '-5px' }}>
          <div
            style={{
              display: 'flex',
              width: '125px',
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
                backgroundImage: `url(${top3[1] ? top3[1].avatar : ''})`,
                backgroundSize: '80px 80px',
                backgroundColor: '#aaa',
              }}
            >
              <img src={No2}></img>
            </div>
          </div>
          <div>
            <p className={styles.top3Name}>{top3[1] ? top3[1].personName : ''}</p>
            <p title={top3[1] ? top3[1].deptName : ''} className={styles.top3Depart}>
              {top3[1] ? top3[1].deptName : ''}
            </p>
            <p className={styles.top3Amount}>{top3[1] ? top3[1].coin : ''}</p>
          </div>
        </Col>
        <Col span={8} style={{ padding: 0, marginRight: '-5px' }}>
          <div
            style={{
              display: 'flex',
              width: '125px',
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
                backgroundImage: `url(${top3[2] ? top3[2].avatar : ''})`,
                backgroundSize: '80px 80px',
                backgroundColor: '#aaa',
              }}
            >
              <img src={No3}></img>
            </div>
          </div>
          <div>
            <p className={styles.top3Name}>{top3[2] ? top3[2].personName : ''}</p>
            <p title={top3[2] ? top3[2].deptName : ''} className={styles.top3Depart}>
              {top3[2] ? top3[2].deptName : ''}
            </p>
            <p className={styles.top3Amount}>{top3[2] ? top3[2].coin : ''}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
