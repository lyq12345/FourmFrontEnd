import React, { useEffect, useState } from 'react';
import BulletScreen from 'rc-bullets';
import StyledBullet from './StyledBullet';
import Banner from '@/assets/img/banner.png';
import No1 from '@/assets/img/no1.png';
import { coinDetailRandom } from '@/api/tangguobi';
const headUrl = 'https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';

const backColors = ['#FFEDED', '#FFF4E5', '#EEFBF9', '#F8F2FF', '#F0F5FF'];
const fontColors = ['#FF441E', '#FFA200', '#00D390', '#C293FF', '#729CFF'];
export default function Bullets(props) {
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState('');
  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    const param1 = {};
    coinDetailRandom().then(({ success, data }) => {
      // console.log(data);
    });
    let s = new BulletScreen('.screen', { duration: 10 });
    let timer = 0;
    if (sequence >= 0) {
      timer = setInterval(() => {
        setSequence((seq) => {
          const index = seq % 5;
          s.push(
            <StyledBullet
              head={headUrl}
              msg={'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'}
              backgroundColor={backColors[index]}
              color={fontColors[index]}
              size="7px"
            />,
          );
          return seq + 1;
        });
      }, 1200);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ ...props.bgSetting }}>
      <div className="screen" style={{ height: '110px', ...props.bulSetting }}></div>
    </div>
  );
}
