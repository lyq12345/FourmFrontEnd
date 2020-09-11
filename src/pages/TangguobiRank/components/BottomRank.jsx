import React from 'react';
import BottomRankItem from './BottomRankItem';
import { Row, Col } from 'antd';
const data = [];
for (let i = 0; i < 30; i++) {
  let item = {
    personCode: 'zhsong3',
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: i + 10 + 1,
    headImg: '@/assets/img/avatar.jpg',
  };
  data.push(item);
}
const BottomRank = (props) => {
  const list1 = props.content.slice(0, 10);
  const list2 = props.content.slice(10, 20);
  const list3 = props.content.slice(20);
  return (
    <div style={{ margin: '20px 0' }}>
      <Row>
        <Col style={{ textAlign: 'left' }} span={8}>
          {list1.map((item) => (
            <BottomRankItem content={item} />
          ))}
        </Col>
        <Col style={{ textAlign: 'center' }} span={8}>
          {list2.map((item) => (
            <BottomRankItem content={item} />
          ))}
        </Col>
        <Col style={{ textAlign: 'right', paddingRight: '20px' }} span={8}>
          {list3.map((item) => (
            <BottomRankItem content={item} />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default BottomRank;
