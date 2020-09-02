import React, { useEffect, useState } from 'react';
import BulletScreen, { StyledBullet } from 'rc-bullets';

const headUrl = 'https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';

const bullets = [];
export default function Bullets() {
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState('');
  useEffect(() => {
    let s = new BulletScreen('.screen', { duration: 20 });
    setScreen(s);
  }, []);

  useEffect(() => {
    console.log(screen);
  }, [screen]);
  const handleChange = ({ target: { value } }) => {
    setBullet(value);
  };

  // 发送弹幕
  const handleSend = () => {
    if (bullet) {
      screen.push(
        <StyledBullet head={headUrl} msg={bullet} backgroundColor={'#fff'} size="small" />,
      );
    }
  };

  return (
    <div className="screen" style={{ width: '100vw', height: '50vh' }}>
      <input value={bullet} onChange={handleChange} />
      <button onClick={handleSend}>发送</button>
    </div>
  );
}
