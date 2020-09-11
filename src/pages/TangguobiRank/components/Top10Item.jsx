import React from 'react';
import styles from './style.less';
import Light from '@/assets/img/light.png';
import No1 from '@/assets/img/no1.png';
import No2 from '@/assets/img/no2.png';
import No3 from '@/assets/img/no3.png';
import No4 from '@/assets/img/no4.png';
import No5 from '@/assets/img/no5.png';
import No6 from '@/assets/img/no6.png';
import No7 from '@/assets/img/no7.png';
import No8 from '@/assets/img/no8.png';
import No9 from '@/assets/img/no9.png';
import No10 from '@/assets/img/no10.png';
import avatar from '@/assets/img/avatar.jpg';

const nos = [No1, No2, No3, No4, No5, No6, No7, No8, No9, No10];

const Top10Item = (props) => {
  const handleClick = () => {
    console.log('click!');
  };
  return (
    <div onClick={handleClick} style={{ display: 'inline-block', margin: '0 -13px' }}>
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
          <img src={nos[props.content.coinOrder - 1]}></img>
        </div>
      </div>
      <div>
        <p className={styles.top10Amount}>{props.content.coin}</p>
        <p className={styles.top10Name}>{props.content.personName}</p>
        <p className={styles.top10Depart}>{props.content.deptName}</p>
      </div>
    </div>
  );
};

export default Top10Item;
