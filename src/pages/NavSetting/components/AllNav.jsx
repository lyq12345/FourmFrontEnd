import React, { useState, useContext, useEffect } from 'react';
import { List, Card, message } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import styles from './style.less';
import { tagListContext } from '../index';

// const data = [
//   { title: '集团邮箱', icon: '', href: '', isAdded: true },
//   { title: '流程中心', icon: '', href: '', isAdded: false },
//   { title: '考勤系统', icon: '', href: '', isAdded: false },
//   { title: 'IMS业务系统', icon: '', href: '', isAdded: false },
//   { title: '招聘系统', icon: '', href: '', isAdded: false },
//   { title: '会议室预定', icon: '', href: '', isAdded: false },
//   { title: '添加', icon: '', href: '', isAdded: false },
// ];
const AllNav = () => {
  const [data, setData] = useState([
    { title: '集团邮箱', icon: '', href: '', isAdded: true },
    { title: '流程中心', icon: '', href: '', isAdded: false },
    { title: '考勤系统', icon: '', href: '', isAdded: false },
    { title: 'IMS业务系统', icon: '', href: '', isAdded: false },
    { title: '招聘系统', icon: '', href: '', isAdded: false },
    { title: '会议室预定', icon: '', href: '', isAdded: false },
    { title: '1', icon: '', href: '', isAdded: false },
    { title: '2', icon: '', href: '', isAdded: false },
    { title: '3', icon: '', href: '', isAdded: false },
    { title: '4', icon: '', href: '', isAdded: false },
    { title: '5', icon: '', href: '', isAdded: false },
    { title: '6', icon: '', href: '', isAdded: false },
    { title: '7', icon: '', href: '', isAdded: false },
    { title: '8', icon: '', href: '', isAdded: false },
    { title: '9', icon: '', href: '', isAdded: false },
  ]);
  const { tagList, setTagList } = useContext(tagListContext);

  const handleAdd = (index) => {
    if (tagList.length >= 15) {
      message.error(`"我的导航"最多只能添加15个哦`);
      return;
    }
    let item = data[index];
    let tagList1 = tagList;
    tagList1.push(item);
    setTagList(JSON.parse(JSON.stringify(tagList1)));
    setTagAdded(index, true);
  };

  const setTagAdded = (index, state) => {
    let data1 = data;
    data1[index].isAdded = state;
    setData(JSON.parse(JSON.stringify(data1)));
  };

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      let exist = false;
      let titleToSearch = data[i].title;
      tagList.forEach((item) => {
        if (item.title === titleToSearch) {
          exist = true;
        }
      });
      if (exist) {
        setTagAdded(i, true);
      } else {
        setTagAdded(i, false);
      }
    }
  }, tagList);
  return (
    <div className={styles.outsideContainer}>
      <h2>全部导航</h2>
      <List
        className={styles.settingsList}
        dataSource={data}
        grid={{ gutter: 10, column: 5 }}
        renderItem={(item, index) => (
          <List.Item>
            <Card bordered={false} size="small">
              <div style={{ display: 'flex' }}>
                <a style={{ color: 'black' }}>{item.title}</a>
                <div style={{ flex: 1 }}></div>
                <div>
                  {item.isAdded ? (
                    <span className={styles.addedText}>已添加</span>
                  ) : (
                    <PlusSquareOutlined
                      onClick={() => {
                        handleAdd(index);
                      }}
                      style={{ color: '#CE1925' }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AllNav;
