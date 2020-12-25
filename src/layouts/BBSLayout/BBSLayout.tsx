import logo from '@/assets/bbs/logo/logo_bbs.png';
import * as api from '@/pages/BBS/api';
import PostCreator from '@/pages/BBS/components/PostCreator/PostCreator';
import { dayjs, IconFont, useBBSGotoSquare } from '@/utils/utilsBBS';
import { CloseOutlined } from '@ant-design/icons';
import { useEventEmitter } from '@umijs/hooks';
import { useLocalStorageState, useToggle } from 'ahooks';
import { Avatar, Modal, Popconfirm } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'umi';
import styles from './BBSLayout.less';
import Button from './components/Button';
import RightCard from './components/RightCard';
import { PostEventContext, ShareEventContext } from './store';

const BBSLayout: React.FC = React.memo(({ children }) => {
  const [trigger1, { toggle: refreshRightCardData1 }] = useToggle();
  const [trigger2, { toggle: refreshRightCardData2 }] = useToggle();

  const postEvent$ = useContext(PostEventContext);
  postEvent$?.useSubscription((strOrArray) => {
    let val, args;
    if (strOrArray instanceof Array) {
      val = strOrArray[0];
      args = strOrArray.slice(1);
    } else {
      val = strOrArray;
      args = [];
    }

    switch (val) {
      case 'success':
        refreshRightCardData1();
        setIsModalVisible(false);
        setOldFormObject(undefined);
        setCanModalDirectClose(true);
        break;
      case 'cancel':
        setIsModalVisible(false);
        setOldFormObject(undefined);
        setCanModalDirectClose(true);
        break;
      case 'doing':
        setIsModalVisible(true);
      case 'redoing':
        setOldFormObject(args[0] || null);
        setIsModalVisible(true);
        break;
      default:
        break;
    }
  });

  const shareEvent$ = useEventEmitter();
  shareEvent$?.useSubscription(() => {
    refreshRightCardData2();
  });

  const go = useBBSGotoSquare();
  const history = useHistory();

  const [bbsUserInfo, setBbsUserInfo] = useLocalStorageState<api.BbsUserInfo>('bbsUserInfo');

  // 精选板块
  const [dataTypeList, setDataTypeList] = useState<api.PostType[]>([]);
  useEffect(() => {
    api.requestType().then((res) => {
      if (res.success) {
        setDataTypeList(res.data ?? []);
      }
    });
  }, []);

  // 我发的帖子
  const [dataPostMyList, setDataPostMyList] = useState<api.Post[]>([]);
  useEffect(() => {
    api.requestMyPosts5().then((res) => {
      if (res.success) {
        setDataPostMyList(res.data?.threads ?? []);
      }
    });
  }, [trigger1]);

  // 我关注的帖子
  const [dataPostShareList, setDataPostShareList] = useState<api.Post[]>([]);
  useEffect(() => {
    api.requestSharePosts5().then((res) => {
      if (res.success) {
        setDataPostShareList(res.data?.threads ?? []);
      }
    });
  }, [trigger2]);

  // 消息数量
  const [count, setCount] = useState(0);
  useEffect(() => {
    api.requestCount().then((res) => {
      setCount(res.data);
    });
  }, []);

  // 发帖对话框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldFormObject, setOldFormObject] = useState<api.Post | undefined>(undefined);
  const handleModalClose = useCallback(() => {
    postEvent$?.emit('cancel');
  }, []);

  const [canModalDirectClose, setCanModalDirectClose] = useState(true);
  const handlePostCreatorChange = useCallback((values) => {
    const hasSomething = Object.values(values).some((v) => +v);
    console.log('hasSomething', hasSomething);
    setCanModalDirectClose(!hasSomething);
  }, []);

  return (
    <ShareEventContext.Provider value={shareEvent$}>
      <div className={styles['bg-container']}>
        {/* 发帖组件 */}
        <Modal
          visible={isModalVisible}
          width={670}
          style={{ top: '20vh' }}
          modalRender={() => (
            <div style={{ pointerEvents: 'initial', '--bbs-primary-color': '#ff5000' }}>
              {canModalDirectClose ? (
                <CloseOutlined
                  style={{ position: 'absolute', left: 679, color: 'white' }}
                  onClick={handleModalClose}
                />
              ) : (
                <Popconfirm
                  title="将清空已编辑内容"
                  onConfirm={handleModalClose}
                  okText="是"
                  cancelText="否"
                >
                  <CloseOutlined style={{ position: 'absolute', left: 679, color: 'white' }} />
                </Popconfirm>
              )}
              <PostCreator oldFormObject={oldFormObject} onValuesChange={handlePostCreatorChange} />
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
            <IconFont type="iconneiwangshouye" style={{ fontSize: 20, marginRight: 5 }} />
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
            <IconFont type="iconshijian" style={{ fontSize: 20, marginRight: 5 }} />
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
                  <Avatar size={72} src={bbsUserInfo?.avatar} className={styles['avatar']} />
                  <span className={styles['name']}>{bbsUserInfo?.name}</span>
                  <div className={styles['wanna-post']} onClick={() => postEvent$?.emit('doing')}>
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
        {/* <Footer /> */}
        <div id="bbs-footer" />
      </div>
    </ShareEventContext.Provider>
  );
});

export default BBSLayout;
