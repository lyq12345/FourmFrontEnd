import React from 'react';
import { Layout, Result, Button, Popover } from 'antd';
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
  {
    label: '账号设置',
    router: ''
  },
  {
    label: '帮助',
    router: ''
  },
  {
    label: '退出',
    router: ''
  }
]
const Navigation = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const popoverContent = (
    <div>
      {
        navigationInfo.map((item, index) => (
          <Link to={item.router} key={index}>
            <div className='navgtionInfo' key={index}>
              {item.label}
            </div>
          </Link>
        ))
      }
    </div>
  )
  console.log(props);
  return (
    <Layout>
      <Header>
        <div className="header">
          <Link to="/">
            <div className="left-content">

              <img src={logo} alt="" />
            </div>
          </Link>
          <div className="right-content">
            <span>8:30签入</span>
            <span>下班未签出</span>
            <Popover overlayClassName='noPopoverTriangle' placement="bottomRight" content={popoverContent} trigger="click">
              <img src={loginheadimg} alt="777" />
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
                <p className="group-name">养生堂集团有限公司</p>
                <p className="son1-company-name">
                  <span>养生堂有限公司 |</span>
                  <span>农夫山泉股份有限公司 |</span>
                  <span>养生堂浙江食品有限公司 |</span>
                  <span>养生堂化妆品有限公司｜</span>
                </p>
                <p className="son2-company-name">
                  <span>北京万泰生物药业股份有限公司</span>
                </p>
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
              <img src={ystLogoMax} alt="" />
              <img src={NFSQlogo} alt="" />
              <img src={YSTLogo} alt="" />
              <img src={WTSWLogo} alt="" />
            </div>
            <div className="right-logo">
              <p className="remark">All Rights Reserved.浙ICP备10201315号-3</p>
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Navigation;
