import React from 'react';
import { Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import styles from './style.less';
const BottomRankItem = (props) => {
  return (
    <div style={{ margin: '10px 0' }}>
      <span className={styles.bottomOrder}>{props.content.coinOrder}</span>
      <Avatar icon={<img src={myAvatar} />} />
      <span className={styles.bottomName}>{props.content.personName}</span>
      <span className={styles.bottomDept}>{props.content.deptName}</span>
      <span className={styles.bottomAmount}>{props.content.coin}</span>
    </div>
  );
};

export default BottomRankItem;
