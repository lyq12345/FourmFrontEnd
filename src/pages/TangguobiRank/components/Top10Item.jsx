import React, { useContext } from 'react';
import styles from './style.less';
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no.1.png';
import No2 from '@/assets/img/no.2.png';
import No3 from '@/assets/img/no.3.png';
import No4 from '@/assets/img/NO.4.png';
import No5 from '@/assets/img/NO.5.png';
import No6 from '@/assets/img/NO.6.png';
import No7 from '@/assets/img/NO.7.png';
import No8 from '@/assets/img/NO.8.png';
import No9 from '@/assets/img/NO.9.png';
import No10 from '@/assets/img/NO.10.png';
// import x2No1 from '@/assets/img/2xno1.png';
import avatar from '@/assets/img/avatar.jpg';
import { modalContext } from './context';

const nos = [No1, No2, No3, No4, No5, No6, No7, No8, No9, No10];

const Top10Item = (props) => {
  const { setVisible, setPersonCode, setDetailData, setYear, setMonth } = useContext(modalContext);
  const handleClick = () => {
    setVisible(true);
    setPersonCode(props.content.personCode);
    setDetailData({
      avatar: props.content.avatar,
      personName: props.content.personName,
      deptName: props.content.deptName,
    });
    setYear(props.year);
    setMonth(props.month);
  };
  return (
    <div
      onClick={handleClick}
      style={{ display: 'inline-block', margin: '0 -13px', cursor: 'pointer' }}
    >
      <div
        style={{
          display: 'flex',
          background: props.content.coinOrder === '1' ? `url(${Light})` : undefined,
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
            backgroundImage: `url(${props.content.avatar})`,
            backgroundSize: '80px 80px',
            backgroundColor: '#aaa',
          }}
        >
          <img style={{ width: 80, height: 80 }} src={nos[props.content.coinOrder - 1]}></img>
        </div>
      </div>
      <div>
        <p className={styles.top10Amount}>{props.content.coin}</p>
        <p className={styles.top10Name}>{props.content.personName}</p>
        <p title={props.content.deptName} className={styles.top10Depart}>
          {props.content.deptName}
        </p>
      </div>
    </div>
  );
};

export default Top10Item;
