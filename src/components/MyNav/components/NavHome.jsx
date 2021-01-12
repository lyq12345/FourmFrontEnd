import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import { GetMenuMy } from '@/api/navigation';
import styles from '../style.less';

export default function NavHome(props) {
  return (
    <div className={styles['nav-home-container']}>
      <List
        dataSource={props.data}
        grid={{ gutter: 16, column: 5 }}
        renderItem={(item) => (
          <List.Item style={{ textAlign: 'left' }}>
            <a target="_blank" href={item.href} style={{ display: 'flex', alignItems: 'center' }}>
              {/* <Avatar style={{ marginRight: '9px' }} size={26} icon={<img src={item.icon} />} /> */}
              <img style={{ marginRight: '9px',width:'26px',height:'26px' }} src={item.icon} />
              <a
                title={item.title}
                style={{
                  fontSize: '13px',
                  fontFamily: 'PingFangSC-Regular, PingFang SC',
                  fontWeight: 400,
                  color: '#333',
                  width: '99px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.title}
              </a>
            </a>
          </List.Item>
        )}
      />
    </div>
  );
}
