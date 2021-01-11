import React, { useState, useContext, useEffect } from 'react';
import { List, Card, message, Avatar } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import styles from './style.less';
import { tagListContext } from '../index';
import { GetAllMenu } from '@/api/navigation';

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
  const [data, setData] = useState([]);
  const { tagList, setTagList } = useContext(tagListContext);

  useEffect(() => {
    GetAllMenu().then(({ success, data }) => {
      if (success) {
        const newData = [];
        data.map((item) => {
          item.isAdded = false;
          newData.push(item);
        });
        setData(newData);
      }
    });
  }, []);

  useEffect(() => {
    checkAdded();
  }, [tagList, data.length]);

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

  const checkAdded = () => {
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
  };

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
                {/* <Avatar size={26} icon={<img src={item.icon} />} /> */}
                <img style={{ width: '26px', height: '26px' }} src={item.icon} />
                <a
                  title={item.title}
                  style={{
                    fontSize: '13px',
                    fontFamily: 'PingFangSC-Regular, PingFang SC',
                    fontWeight: 400,
                    color: '#333',
                    marginLeft: '9px',
                    maxWidth: '7em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: '25px',
                  }}
                >
                  {item.title}
                </a>
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
