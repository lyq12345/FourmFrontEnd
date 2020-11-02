import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import { GetMenuMy } from '@/api/navigation';

const data = [
  { title: '集团邮箱', icon: '', href: '' },
  { title: '流程中心', icon: '', href: '' },
  { title: '考勤系统', icon: '', href: '' },
  { title: 'IMS业务系统', icon: '', href: '' },
  { title: '招聘系统', icon: '', href: '' },
  { title: '会议室预定', icon: '', href: '' },
  { title: '添加', icon: '', href: '' },
];
export default function NavHome() {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    GetMenuMy().then(({ success, data }) => {
      if (success) {
        setMenuData(data);
      }
    });
  }, []);
  return (
    <div>
      <List
        dataSource={menuData}
        grid={{ gutter: 16, column: 5 }}
        renderItem={(item) => (
          <List.Item style={{ textAlign: 'left' }}>
            <span>
              <Avatar size={26} icon={<img src={item.icon} />} />
              <a
                style={{
                  fontSize: '14px',
                  fontFamily: 'PingFangSC-Regular, PingFang SC',
                  fontWeight: 400,
                  color: '#333',
                  marginLeft: '12px',
                }}
              >
                {item.title}
              </a>
            </span>
          </List.Item>
        )}
      />
    </div>
  );
}
