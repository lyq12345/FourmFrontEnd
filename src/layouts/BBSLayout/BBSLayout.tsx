import React, { useState, useEffect } from 'react';

import logo from '@/assets/bbs/logo/logo_bbs.png';
import png1 from '@/assets/bbs/icon/png1.png';
import png2 from '@/assets/bbs/icon/png2.png';
import styles from './BBSLayout.less';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Footer from './components/Footer';
import Button from './components/Button';
import RightCard, { typeRightCard } from './components/RightCard';
import { useHistory, useRouteMatch } from 'umi';
import { useLocalStorage } from 'react-use';

import * as api from './api';

const rightCard: typeRightCard = {
  title: '我发的帖子',
  list: [
    {
      title: '养生堂·农夫山泉2021校招内推',
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '圣诞，为你下场咖啡雪——炭仌挂多余文本多余文本',
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '食品新款饼干“重金求子”名字征集中',
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '在龙坞就可以吃到美味欧包~',
      count: +(Math.random() * 200) | 0,
    },
    {
      title: '“清嘴女孩”送你最in七夕攻略',
      count: +(Math.random() * 200) | 0,
    },
  ],
};

const BBSLayout: React.FC = React.memo(({ children }) => {
  const history = useHistory();
  const [userInfo] = useLocalStorage<{ personName: string }>('userInfo');

  // 精选板块
  const [dataTypeList, setDataTypeList] = useState<api.PostType[]>([]);
  useEffect(() => {
    api.requestType().then((res) => {
      setDataTypeList(res.data ?? []);
    });
  }, []);

  // 我发的帖子
  const [dataPostMyList, setDataPostMyList] = useState<api.Post[]>([]);
  useEffect(() => {
    api.requestMyPosts().then((res) => {
      setDataPostMyList(res.data?.threads?.slice(0, 5) ?? []);
    });
  }, []);

  // 我发的帖子
  const [dataPostShareList, setDataPostShareList] = useState<api.Post[]>([]);
  useEffect(() => {
    api.requestMyPosts().then((res) => {
      setDataPostShareList(res.data?.threads?.slice(0, 5) ?? []);
    });
  }, []);

  // 消息数量
  const [count, setCount] = useState((Math.random() * 200) | 0);

  return (
    <div className={styles['bg-container']}>
      {/* 顶部导航 */}
      <div className={styles['navbar-bg-container']}>
        <div className={styles['line']} />
        <div className={styles['navbar']}>
          <img
            src={logo}
            style={{ width: 208, height: 65, marginRight: 689, cursor: 'pointer' }}
            onClick={() => history.push('/bbs')}
          />
          <img src={png1} style={{ width: 20, height: 20, marginRight: 5 }} />
          <span
            style={{ color: '#666666', cursor: 'pointer' }}
            onClick={() => history.push('/home')}
          >
            内网首页
          </span>
          <div
            style={{ borderLeft: '1px solid #EEEEEE', height: 12, marginLeft: 22, marginRight: 17 }}
          ></div>
          <img src={png2} style={{ width: 20, height: 20, marginRight: 5 }} />
          <span style={{ color: '#666666' }}>
            {dayjs().locale('zh-cn').format('YYYY年MM月DD日 dddd')}
          </span>
        </div>
      </div>

      <div className={styles['content-container']}>
        <div className={styles['content']}>
          <div className={styles['sidebar']}>
            <Button iconFontType="iconshouye" className={styles['button']} url="/bbs/home">
              首页
            </Button>
            <Button
              iconFontType="iconxiaoxi"
              className={styles['button']}
              url="/bbs/message"
              count={count}
              onClick={() => setCount(0)}
            >
              消息
            </Button>
            <Button iconFontType="iconguangchang" className={styles['button']} url="/bbs/square">
              广场
            </Button>
            <Button iconFontType="iconwode" className={styles['button']} url="/bbs/mine">
              我的
            </Button>

            {/* 分割线 */}

            <span className={styles['divider']}>精选板块</span>
            <div className={styles['nav-list']}>
              {dataTypeList.map(({ name, id }) => {
                return (
                  <div
                    className={styles['nav-item']}
                    onClick={() => history.push(`/bbs/square/${id}`)}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles['center']}>{children}</div>
          <div className={styles['sidebar-right']}>
            <div className={styles['profile']}>
              <div className={styles['profile-content']}>
                <img
                  className={styles['avatar']}
                  src={
                    'https://cdn1.oneprofile.page/pages/avatars/323/large/Danielle_Darren-2019-255-500x500.jpg?1593718847'
                  }
                  alt="avatar"
                />
                <span className={styles['name']}>{userInfo.personName}</span>
                <div className={styles['wanna-post']}>我要发帖</div>
              </div>
            </div>

            <RightCard list={dataPostMyList} title="我发的帖子" />
            <RightCard list={dataPostShareList} title="我关注的帖子" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});

export default BBSLayout;
