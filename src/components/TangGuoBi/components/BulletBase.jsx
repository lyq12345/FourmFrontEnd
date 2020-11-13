import React, { useEffect, useState } from 'react';
import BulletScreen from 'rc-bullets';
import StyledBullet from './StyledBullet';
import Banner from '@/assets/img/banner.png';
import No1 from '@/assets/img/no1.png';
import { coinDetailRandom } from '@/api/tangguobi';
const headUrl = 'https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';

const backColors = ['#FFEDED', '#FFF4E5', '#EEFBF9', '#F8F2FF', '#F0F5FF'];
const fontColors = ['#FF441E', '#FFA200', '#00D390', '#C293FF', '#729CFF'];

// 弹幕组件
export default function Bullets(props) {
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullets, setBullets] = useState([]);
  const [sequence, setSequence] = useState(0);
  let timer = 0;
  function fn() {
    setSequence((seq) => {
      const size = bullets.length;
      const bulletIndex = seq % size;
      const styleIndex = seq % 5;
      const item = bullets[bulletIndex];
      const msg = item.personNameTo + ' 获得' + item.coin + '堂果币';
      const valuesType = item.valuesType + ' | ';
      const reason = item.reason;
      screen.push(
        <StyledBullet
          head={item.avatar}
          msg={msg}
          valuesType={valuesType}
          reason={reason}
          backgroundColor={backColors[styleIndex]}
          color={fontColors[styleIndex]}
          size="7px"
        />,
      );
      return seq + 1;
    });
    const newTime = Math.random() * 1800 + 2000;
    clearInterval(timer);
    timer = setInterval(fn, newTime);
  }
  useEffect(() => {
    let s = new BulletScreen('.screen', { duration: 13 });
    setScreen(s);
    coinDetailRandom().then(({ success, data }) => {
      if (success) {
        setBullets(data);
      }
    });
  }, []);

  useEffect(() => {
    if (bullets.length !== 0) {
      timer = setInterval(fn, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [bullets]);

  return (
    <div style={{ ...props.bgSetting }}>
      <div className="screen" style={{ height: '110px', ...props.bulSetting }}></div>
    </div>
  );
}
