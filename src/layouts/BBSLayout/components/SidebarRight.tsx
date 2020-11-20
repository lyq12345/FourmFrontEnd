import React from 'react';
import png from '@/assets/bbs/avatar.png';
import RightCard, { typeRightCard } from './RightCard';

const rightCard: typeRightCard = {
  title: '我发的帖子',
  list: [
    {
      title: '养生堂·农夫山泉2021校招内推',
      good: Math.random() < 0.5,
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '圣诞，为你下场咖啡雪——炭仌挂多余文本多余文本',
      good: Math.random() < 0.5,
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '食品新款饼干“重金求子”名字征集中',
      good: Math.random() < 0.5,
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '在龙坞就可以吃到美味欧包~',
      good: Math.random() < 0.5,
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '“清嘴女孩”送你最in七夕攻略',
      good: Math.random() < 0.5,
      count: (Math.random() * 200) | 0,
    },
  ],
};

const SidebarRight: React.FC = React.memo(() => {
  return (
    <div style={{ width: 307, marginLeft: 12 }}>
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
        <img src={png} alt="avatar" style={{ margin: '65px 0 15px 0', width: 72, height: 72 }} />
        <span style={{ lineHeight: '20px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>
          name
        </span>

        <div
          style={{
            marginTop: 9,
            width: 92,
            height: 32,
            lineHeight: '32px',
            color: '#ffffff',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #FF6C29 0%, #EB0029 100%)',
            borderRadius: 4,
          }}
        >
          我要发帖
        </div>

        <RightCard {...rightCard} />
        <RightCard {...rightCard} />
      </div>
    </div>
  );
});

export default SidebarRight;
