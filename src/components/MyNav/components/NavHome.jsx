import React from 'react';
import { List } from 'antd';

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
  return (
    <div>
      <List
        dataSource={data}
        grid={{ gutter: 16, column: 5 }}
        renderItem={(item) => (
          <List.Item style={{ textAlign: 'left' }}>
            <span>
              <a style={item.title === '添加' ? { color: 'red' } : { color: 'black' }}>
                {item.title}
              </a>
            </span>
          </List.Item>
        )}
      />
    </div>
  );
}
