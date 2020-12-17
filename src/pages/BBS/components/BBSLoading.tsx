import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#ff5000' }} spin />;

export default React.memo<{ loading: boolean }>(({ loading, children }) => {
  return <Spin delay={300} indicator={antIcon} spinning={loading} children={children} />;
});
