import React, { useState, useEffect } from 'react';
import { Layout, Result, Button, Popover, Breadcrumb, Divider } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import loginheadimg from '@/assets/img/login-head-img.png';
import logo from '@/assets/img/joelee-logo.png';
import ystLogoMax from '@/assets/img/yst-logo-max.png';
import NFSQlogo from '@/assets/img/NFSQ-logo.png';
import YSTLogo from '@/assets/img/YST-logo.png';
import WTSWLogo from '@/assets/img/WTSW-logo.png';
import mobile from '@/assets/img/mobile.png';
import phone from '@/assets/img/phone.png';
import ModelAdvertising from '@/components/ModelAdvertising';
import { connect, ConnectState } from 'umi';
import { GetAtten } from '@/api/common';
import styles from './styles.less'

import { Link } from 'umi';

const { Header, Footer, Content } = Layout;

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
const navigationInfo = [
  {
    label: '个人主页',
    router: '/yst-iwork-alpha/personal-homepage',
  },
  // {
  //   label: '账号设置',
  //   router: ''
  // },
  // {
  //   label: '帮助',
  //   router: ''
  // },
  {
    label: '退出',
    router: 'logout',
  },
];
const routeMap = new Map();
const Navigation = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
    route,
  } = props;
  const [attendanceInfo, setAttendanceInfo] = useState(null);
  const [loginInUserInfo, setLoginInUserInfo] = useState(JSON.parse(localStorage.getItem('userInfoLogin')))
  // const [headImage, setHeadImage] = useState(loginheadimg);
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  useEffect(() => {
    getAttenDataList();
    // let loginInUserInfo = JSON.parse(localStorage.getItem('userInfoLogin'));
    // setHeadImage(loginInUserInfo && loginInUserInfo.headImage);

  }, []);
  const getAttenDataList = () => {
    GetAtten().then((response) => {
      if (response.success) {
        setAttendanceInfo(response.data);
      }
    });
  };
  // 去除末尾的斜杠
  let noSlashPath = '';
  if (location.pathname[location.pathname.length - 1] === '/') {
    noSlashPath = location.pathname.substring(0, location.pathname.length - 1);
  } else {
    noSlashPath = location.pathname;
  }

  // 按斜杠分割成数组
  let routeArray = [];
  noSlashPath.split('/').map((item, index, arr) => {
    if (item !== '') {
      if (index === 1) {
        routeArray.push('/' + item);
      } else {
        routeArray.push('/' + arr[index - 1] + '/' + item);
      }
    }
  });

  // 递归，map路由与导航名称
  const setRouteMap = (data) => {
    for (let item of data) {
      if (item.path !== '/home') {
        routeMap.set(item.path, item.name);
        if (item.routes) {
          setRouteMap(item.routes);
        }
      }
    }
  };
  const routeList = route.children;
  setRouteMap(routeList);

  const onMenuClick = () => {
    const { dispatch } = props;

    if (dispatch) {
      dispatch({
        type: 'user/logout',
      });
    }
  };
  const imgDispatch = (url: string | undefined) => {
    window.open(url); //新页面打开
  };
  const popoverContent = (
    <div>
      {navigationInfo.map((item, index) => (
        <div key={index}>
          {item.router !== 'logout' ? (
            <div className="navgtionInfo" onClick={() => imgDispatch(item.router)}>{item.label}</div>
          ) : (
              <div onClick={() => onMenuClick()} className="navgtionInfo">
                {item.label}
              </div>
            )}
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <Layout>
        <Header>
          <div className={styles.header}>
            <Link to="/">
              <div className={styles.leftContent}>
                <img src={logo} alt="" />
                {/* <span>JoeLee</span> */}
              </div>
            </Link>
            <div className={styles.rightContent}>
              <span>{attendanceInfo}</span>
              <Popover
                overlayClassName={styles.noPopoverTriangle}
                placement="bottomRight"
                content={popoverContent}
                trigger="hover"
              >
                <img
                  className={styles.headerImg}
                  onError={(e) => { e.target.onerror = null; e.target.src = loginheadimg }}
                  src={
                    (loginInUserInfo && loginInUserInfo.headImage) ||
                    loginheadimg
                  }
                  alt=""
                />
              </Popover>
            </div>
          </div>
        </Header>
        <Content>
          <Authorized authority={authorized!.authority} noMatch={noMatch}>
            {routeMap.has(noSlashPath) && noSlashPath !== '/home' ? (
              <div style={{ margin: '20px 0' }}>
                <Breadcrumb separator="" style={{ color: '#D30B24' }}>
                  <Breadcrumb.Item>
                    <Link to="/home" style={{ color: '#D30B24' }}>
                      首页
                    </Link>
                  </Breadcrumb.Item>
                  {routeArray.map((item, index) => {
                    return (
                      <Breadcrumb separator="" style={{ display: 'inline', color: '#D30B24' }} key={index}>
                        <Breadcrumb.Separator>
                          <span style={{ color: '#D30B24' }}>&gt;</span>
                        </Breadcrumb.Separator>
                        {item === noSlashPath ? (
                          <Breadcrumb.Item>
                            <span style={{ color: '#D30B24' }}>{routeMap.get(item)}</span>
                          </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item>
                              <Link to={item} style={{ color: '#D30B24' }}>
                                {routeMap.get(item)}
                              </Link>
                            </Breadcrumb.Item>
                          )}
                      </Breadcrumb>
                    );
                  })}
                </Breadcrumb>
              </div>
            ) : null}
            {children}
          </Authorized>
        </Content>
        <Footer>
          <div className={styles.footerInfo}>
            <div className={styles.footer}>
              <div className={styles.leftContent}>
                <div className={styles.companyName}>
                  <div className={styles.groupName}>
                    <a href="https://www.seu.edu.cn/" target="_Blank">
                      东南大学
                    </a>
                  </div>
                  <div className={styles.son1CompanyName}>
                    <a href="https://cose.seu.edu.cn/" target="_Blank">
                      东南大学软件学院
                    </a>
                    <Divider className={styles.linkDivider} type="vertical" />
                    <a href="https://cse.seu.edu.cn/" target="_Blank">
                      东南大学计算机科学与工程学院
                    </a>
                    
                  </div>
                  <div className={styles.son2CompanyName}>
                    <a href="https://www.ystwt.com" target="_Blank">
                      联系开发者
                    </a>
                  </div>
                </div>
                {/* <p className="footer-company-logo">
                  <img src="" alt="" />
                </p> */}
              </div>
              <div className={styles.rightContent}>
                <div className={styles.ITServicePhone}>
                  <p className={styles.ITService}>IT服务台：</p>
                  <p className={styles.phoneNum}>
                    <img src={mobile} alt="" />
                    <span>0571-87663116</span>
                    <span>工作日</span>
                  </p>
                  <p className={styles.phoneNum}>
                    <img src={phone} alt="" />
                    <span>18072772789</span>
                    <span>节假日</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footerCompanyLogo}>
            <div className={styles.footerLeftContent}>
              <div className={styles.leftLogo}>
                <img src={logo} alt="" onClick={() => imgDispatch('http://www.yst.com.cn')} />
                
              </div>
              <div className={styles.rightLogo}>
                <p className={styles.remark}>All Rights Reserved.浙ICP备10201315号-3</p>
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
      {location.pathname === '/home' || location.pathname === '/' ? (
        <ModelAdvertising pathname={location.pathname} />
      ) : (
          <></>
        )}
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(Navigation);
