import React, { createContext, useState, useEffect } from 'react';
import MyNav from './components/MyNav';
import AllNav from './components/AllNav';
import { Button, message, Card } from 'antd';
import styles from './style.less';
import Hint from '@/assets/img/hint2.png';
import { GetAllMenu } from '@/api/navigation'

// 创建上下文
export const tagListContext = createContext(null);
const NavSetting = () => {
  const [tagList, setTagList] = useState([
    { title: '集团邮箱', icon: '', href: '' },
    { title: '流程中心', icon: '', href: '' },
    { title: '考勤系统', icon: '', href: '' },
    { title: 'IMS业务系统', icon: '', href: '' },
    { title: '招聘系统', icon: '', href: '' },
    { title: '会议室预定', icon: '', href: '' },
    { title: '添加', icon: '', href: '' },
    { title: '1', icon: '', href: '' },
    { title: '2', icon: '', href: '' },
    { title: '3', icon: '', href: '' },
    { title: '4', icon: '', href: '' },
    { title: '5', icon: '', href: '' },
    { title: '6', icon: '', href: '' },
    { title: '添加', icon: '', href: '' },
  ]);

  const [clicked, setClicked] = useState(false);
  const handleSave = () => {
    message.success('保存成功');
  };

  const handleClick = () => {
    setClicked(true);
  };

  const handleCancel = () => { };

  useEffect(() => {
    GetAllMenu();
  }, [])
  return (
    <div>
      <div style={{ backgroundColor: '#fff' }}>
        <tagListContext.Provider value={{ tagList, setTagList }}>
          <MyNav />
          <AllNav />
        </tagListContext.Provider>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleCancel} className={styles.cancelButton}>
          <span>取消</span>
        </Button>
        <Button onClick={handleSave} className={styles.saveButton} type="primary">
          <span>保存</span>
        </Button>
      </div>
      {/* 遮罩层 */}
      <div
        onClick={handleClick}
        hidden={clicked}
        style={{
          display: 'flex', // 使用flex布局
          position: 'absolute', // 绝对定位
          top: '0px', // 距离父级元素顶部0像素
          left: '0px', // 距离父级元素左侧0像素
          zIndex: 10, // 遮罩层的堆叠层级（只要设置的比被遮罩元素高就行）
          height: '100%', // 与父级元素同高
          width: '100%', // 与父级元素同宽
          textAlign: 'center',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <img className={styles.hintImg} src={Hint} alt=""></img>
      </div>
    </div>
  );
};

export default NavSetting;
