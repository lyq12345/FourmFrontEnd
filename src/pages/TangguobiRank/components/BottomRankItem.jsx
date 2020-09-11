import React, { useContext } from 'react';
import { Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import styles from './style.less';
import { modalContext } from './context';
const BottomRankItem = (props) => {
  const { setVisible, setPersonCode } = useContext(modalContext);

  const handleClick = () => {
    setVisible(true);
    setPersonCode(props.content.personCode);
  };
  return (
    <div style={{ margin: '10px 0' }} onClick={handleClick}>
      <span className={styles.bottomOrder}>{props.content.coinOrder}</span>
      <Avatar icon={<img src={props.content.avatar} />} />
      <span className={styles.bottomName}>{props.content.personName}</span>
      <span className={styles.bottomDept}>{props.content.deptName}</span>
      <span className={styles.bottomAmount}>{props.content.coin}</span>
    </div>
  );
};

export default BottomRankItem;
