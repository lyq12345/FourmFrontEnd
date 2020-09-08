import React from 'react';
import Top10 from './Top10';
import BottomRank from './BottomRank';
//import myAvatar from '@/assets/img/avatar.jpg';

const data = [
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '1',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '2',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '3',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '4',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '5',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '6',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '7',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '8',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '9',
    headImg: '@/assets/img/avatar.jpg',
  },
  {
    personName: '张三',
    deptName: '信息技术部',
    coin: '10000',
    coinOrder: '10',
    headImg: '@/assets/img/avatar.jpg',
  },
];
const RankingContent = () => {
  return (
    <div>
      <Top10 content={data} />
      <BottomRank />
    </div>
  );
};

export default RankingContent;
