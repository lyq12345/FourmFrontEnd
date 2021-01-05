import React, { useEffect, useState } from 'react';
import BulletScreen from 'rc-bullets';
import StyledBullet from './StyledBullet';
import Banner from '@/assets/img/banner.png';
import No1 from '@/assets/img/no1.png';
import { coinDetailRandom } from '@/api/tangguobi';
import { message } from 'antd';
const headUrl = 'https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';

const backColors = ['#FFEDED', '#FFF4E5', '#EEFBF9', '#F8F2FF', '#F0F5FF'];
const fontColors = ['#FF441E', '#FFA200', '#00D390', '#C293FF', '#729CFF'];

let curScreen = null;
let timer = 0;
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState == 'hidden') {
    curScreen.clear();
    curScreen.pause();
    // clearInterval(timer);
  } else {
    curScreen.resume();
  }
});
// 弹幕组件
export default function Bullets(props) {
  // 弹幕内容
  const [bullets, setBullets] = useState([]);
  const [sequence, setSequence] = useState(0);
  const [pushDelay, setDelay] = useState(0);
  const track = props.type ? ['5%', '50%'] : ['5%', '50%', '70%']; //1:首页 0：详情页

  function rd(n, m) {
    // 小：5 50 大：
    let c = m - n + 1;
    return String(Math.floor(Math.random() * c + n)) + '%';
  }
  function fn() {
    setSequence((seq) => {
      const size = bullets.length;
      const bulletIndex = seq % size;
      const styleIndex = seq % 5;
      const item = bullets[bulletIndex];
      const msg = item.personNameTo + ' 获得' + item.coin + '堂果币';
      const valuesType = item.valuesType + ' | ';
      const reason = item.reason;

      if (bulletIndex === size - 1) {
        curScreen.clear();
        curScreen.pause();
        curScreen.resume();
      }

      curScreen.push(
        <StyledBullet
          head={item.avatar}
          msg={msg}
          valuesType={valuesType}
          reason={reason}
          backgroundColor={backColors[styleIndex]}
          color={fontColors[styleIndex]}
          size="7px"
        />,
        { duration: 13, top: track[seq % (props.type ? 2 : 3)] },
      );
      return seq + 1;
    });
    const newTime = Math.random() * 1800 + 2000;
    clearInterval(timer);
    timer = setInterval(fn, newTime);
  }
  useEffect(() => {
    curScreen = new BulletScreen('.screen', { loopCount: 1 });
    coinDetailRandom().then(({ success, data }) => {
      if (success) {
        setBullets(data);
      }
    });
  }, []);

  useEffect(() => {
    if (bullets.length !== 0) {
      timer = setInterval(fn, 1500);
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
