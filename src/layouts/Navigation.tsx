import React, { useEffect, useState } from 'react';
import { Layout, Result, Button, Popover, Divider } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter, fliterRouter } from '@/utils/utils';
import loginheadimg from '@/assets/img/login-head-img.png';
import logo from '@/assets/img/logo.png';
import ystLogoMax from '@/assets/img/yst-logo-Max.png';
import NFSQlogo from '@/assets/img/NFSQ-logo.png';
import YSTLogo from '@/assets/img/YST-logo.png';
import WTSWLogo from '@/assets/img/WTSW-logo.png';
import mobile from '@/assets/img/mobile.png';
import phone from '@/assets/img/phone.png';
import ModelAdvertising from '@/components/ModelAdvertising';
import { connect, ConnectState } from 'umi';
import { GetAtten } from '@/api/common'


import { Link } from 'umi';

const { Header, Footer, Sider, Content } = Layout;

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
    router: '/personal-homepage'
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
    router: 'logout'
  }
]
const Navigation = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const [attendanceInfo, setAttendanceInfo] = useState(null)
  const [headImage, setHeadImage] = useState(loginheadimg)
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  useEffect(() => {
    getAttenDataList()
    let loginInUserInfo = JSON.parse(localStorage.getItem('userInfoLogin'))
    setHeadImage(loginInUserInfo && loginInUserInfo.headImage)
  }, [])
  const getAttenDataList = () => {
    GetAtten().then(response => {
      if (response.success) {
        setAttendanceInfo(response.data)
      }
    })
  }
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
  }
  const popoverContent = (
    <div>
      {
        navigationInfo.map((item, index) => (
          <div key={index}>
            {
              item.router !== 'logout' ?
                <Link to={item.router}>
                  <div className='navgtionInfo'>
                    {item.label}
                  </div>
                </Link> : <div onClick={() => onMenuClick()} className='navgtionInfo'>{item.label}</div>
            }
          </div>
        ))
      }
    </div>
  )
  return (
    <div>
      <Layout>
        <Header>
          <div className="header">
            <Link to="/">
              <div className="left-content">
                <img src={logo} alt="" />
              </div>
            </Link>
            <div className="right-content">
              <span>{attendanceInfo}</span>
              <Popover overlayClassName='noPopoverTriangle' placement="bottomRight" content={popoverContent} trigger="click">
                <img className='headerImg' src={(JSON.parse(localStorage.getItem('userInfoLogin')) && JSON.parse(localStorage.getItem('userInfoLogin')).headImage) || loginheadimg} alt="" />
              </Popover>
            </div>
          </div>
        </Header>
        <Content>
          <Authorized authority={authorized!.authority} noMatch={noMatch}>
            {children}
          </Authorized>
        </Content>
        <Footer>
          <div className="footer-info">
            <div className="footer">
              <div className="left-content">
                <div className="company-name">
                  <div className="group-name">
                    <a href="http://www.yst.com.cn" target="_Blank">养生堂集团有限公司</a>
                  </div>
                  <div className="son1-company-name">
                    <a href="http://www.yst.com.cn" target="_Blank">养生堂有限公司</a>
                    <Divider className='link-divider' type="vertical" />
                    <a href="https://www.nongfuspring.com" target="_Blank">农夫山泉股份有限公司</a>
                    <Divider className='link-divider' type="vertical" />
                    <a href="http://www.ystco.com.cn" target="_Blank">养生堂浙江食品有限公司</a>
                    <Divider className='link-divider' type="vertical" />
                    <a href="http://yoseido.yst.com.cn" target="_Blank">养生堂化妆品有限公司</a>
                  </div>
                  <div className="son2-company-name">
                    <a href='https://www.ystwt.com' target="_Blank">北京万泰生物药业股份有限公司</a>
                  </div>
                </div>
                {/* <p className="footer-company-logo">
                  <img src="" alt="" />
                </p> */}
              </div>
              <div className="right-content">
                <div className="IT-service-phone">
                  <p className="IT-service">IT服务台：</p>
                  <p className="phone-num">
                    <img src={mobile} alt="" />
                    <span>0571-87663116</span>
                    <span>工作日</span>
                  </p>
                  <p className="phone-num">
                    <img src={phone} alt="" />
                    <span>18072772789</span>
                    <span>节假日</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-company-logo">
            <div className="footer-left-content">
              <div className="left-logo">
                <img src={ystLogoMax} alt="" onClick={() => imgDispatch('http://www.yst.com.cn')} />
                <img src={NFSQlogo} alt="" onClick={() => imgDispatch('https://www.nongfuspring.com')} />
                <img src={YSTLogo} alt="" onClick={() => imgDispatch('http://yoseido.yst.com.cn')} />
                <img src={WTSWLogo} alt="" onClick={() => imgDispatch('https://www.ystwt.com')} />
              </div>
              <div className="right-logo">
                <p className="remark">All Rights Reserved.浙ICP备10201315号-3</p>
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
      {
        location.pathname === '/home' || location.pathname === '/' ? <ModelAdvertising pathname={location.pathname} /> : <></>
      }
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(Navigation);
