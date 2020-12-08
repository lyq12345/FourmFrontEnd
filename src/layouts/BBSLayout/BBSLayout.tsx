import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from 'umi';
import { useLocalStorage } from 'react-use';
import { useRecoilState } from 'recoil';

import Footer from './components/Footer';
import Button from './components/Button';
import RightCard from './components/RightCard';
import * as api from '@/pages/BBS/api';
import { useBBSGotoSquare } from '@/utils/utilsBBS';
import { globalFormObj, isPostCreatorModalVisible, oldFormObj } from './store';
import { dayjs } from '@/utils/utilsBBS';

import logo from '@/assets/bbs/logo/logo_bbs.png';
import png1 from '@/assets/bbs/icon/png1.png';
import png2 from '@/assets/bbs/icon/png2.png';
import styles from './BBSLayout.less';
import { Modal } from 'antd';
import PostCreator from '@/pages/BBS/components/PostCreator/PostCreator';
import { CloseOutlined } from '@ant-design/icons';
import { useEventEmitter, useToggle } from 'ahooks';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

// 发帖事件使用
export const EventContext = createContext<EventEmitter<string> | null>(null);

const BBSLayout: React.FC = React.memo(({ children }) => {
  // 发帖完成事件
  const event$ = useEventEmitter<string>();
  const [trigger, { toggle }] = useToggle();
  event$?.useSubscription((val) => {
    if (val === 'success') {
      toggle();

      setIsModalVisible(false);
      setOldFormObject(undefined);
    }
  });

  const go = useBBSGotoSquare();
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
    api.requestMyPosts5().then((res) => {
      setDataPostMyList(res.data?.threads ?? []);
    });
  }, [trigger]);

  // 我关注的帖子
  const [dataPostShareList, setDataPostShareList] = useState<api.Post[]>([]);
  useEffect(() => {
    api.requestSharePosts5().then((res) => {
      setDataPostShareList(res.data?.threads ?? []);
    });
  }, [trigger]);

  // 消息数量
  const [count, setCount] = useState(0);
  useEffect(() => {
    api.requestCount().then((res) => {
      setCount(res.data);
    });
  }, []);

  // 发帖对话框
  const [isModalVisible, setIsModalVisible] = useRecoilState(isPostCreatorModalVisible);
  const [oldFormObject, setOldFormObject] = useRecoilState(globalFormObj);

  return (
    <EventContext.Provider value={event$}>
      <div className={styles['bg-container']}>
        {/* 发帖组件 */}
        <Modal
          visible={isModalVisible}
          width={670}
          style={{ top: 200 }}
          modalRender={() => (
            <div style={{ pointerEvents: 'initial' }}>
              <CloseOutlined
                style={{ position: 'absolute', left: 679, color: 'white' }}
                onClick={() => {
                  setIsModalVisible(false);
                  setOldFormObject(undefined);
                }}
              />
              <PostCreator oldFormObject={oldFormObject} />
            </div>
          )}
          destroyOnClose
        ></Modal>

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
              style={{
                borderLeft: '1px solid #EEEEEE',
                height: 12,
                marginLeft: 22,
                marginRight: 17,
              }}
            ></div>
            <img src={png2} style={{ width: 20, height: 20, marginRight: 5 }} />
            <span style={{ color: '#666666' }}>{dayjs().format('YYYY年MM月DD日 dddd')}</span>
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
                    <div className={styles['nav-item']} onClick={() => go(id, false)} key={id}>
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
                  <div className={styles['wanna-post']} onClick={() => setIsModalVisible(true)}>
                    我要发帖
                  </div>
                </div>
              </div>

              {!!dataPostMyList.length && <RightCard list={dataPostMyList} title="我发的帖子" />}
              {!!dataPostShareList.length && (
                <RightCard list={dataPostShareList} title="我关注的帖子" />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </EventContext.Provider>
  );
});

export default BBSLayout;
