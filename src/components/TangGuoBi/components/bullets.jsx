import React, { useEffect, useState } from 'react';
import BulletScreen from 'rc-bullets';
import StyledBullet from './StyledBullet';

const headUrl = 'https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';

const backColors = ['#FFEDED', '#FFF4E5', '#EEFBF9', '#F8F2FF', '#F0F5FF'];
const fontColors = ['#FF441E', '#FFA200', '#00D390', '#C293FF', '#729CFF'];
export default function Bullets() {
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState('');
  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    let s = new BulletScreen('.screen', { duration: 10 });
    let timer = 0;
    if (sequence >= 0) {
      timer = setInterval(() => {
        setSequence((seq) => {
          const index = seq % 5;
          s.push(
            <StyledBullet
              head={headUrl}
              msg={'11122222222222222221111111111111111111111111111111111'}
              backgroundColor={backColors[index]}
              color={fontColors[index]}
              size="7px"
            />,
          );
          return seq + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className="screen" style={{ margin: '0 117px', height: '110px' }}></div>;
}
