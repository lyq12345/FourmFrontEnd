import React from 'react';
import { Layout, Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter, fliterRouter } from '@/utils/utils';
import loginheadimg from '@/assets/img/login-head-img.png';

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
  console.log(props);
  return (
    <Layout>
      <Header>
        <div className="header">
          <div className="left-content">
            <span>集团内网</span>
          </div>
          <div className="right-content">
            <span>8:30签入</span>
            <span>下班未签出</span>
            <img src={loginheadimg} alt="777" />
          </div>
        </div>
      </Header>
      <Content>
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </Content>
      <Footer>
        <div className="footer">
          <div className="left-content">
            <div className="company-name">
              <p className="group-name">养生堂集团有限公司</p>
              <p className="son1-company-name">
                <span>养生堂有限公司 |</span>
                <span>农夫山泉股份有限公司 |</span>
                <span>养生堂浙江食品有限公司 |</span>
              </p>
              <p className="son2-company-name">
                <span>养生堂化妆品有限公司｜</span>
                <span>北京万泰生物药业股份有限公司</span>
              </p>
            </div>
            <p className="footer-company-logo">{/* <img src="" alt="" /> */}</p>
          </div>
          <div className="right-content">
            <div className="IT-service-phone">
              <p className="IT-service">IT服务台：</p>
              <p className="phone-num">
                <span>0571-87663116</span>
                <span>工作日</span>
              </p>
              <p className="phone-num">
                <span>18072772789</span>
                <span>节假日</span>
              </p>
            </div>
            <p className="remark">All Rights Reserved.浙ICP备10201315号-3</p>
          </div>
        </div>
        <div className="footer-company-logo" />
      </Footer>
    </Layout>
  );
};

export default Navigation;
