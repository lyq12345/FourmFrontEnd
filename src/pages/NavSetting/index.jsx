import React, { createContext, useState, useEffect } from 'react';
import MyNav from './components/MyNav';
import AllNav from './components/AllNav';
import { Button, message, Card, Spin } from 'antd';
import styles from './style.less';
import Hint from '@/assets/img/hint3.png';
import { GetMenuMy, SaveMyMenu } from '@/api/navigation';
import { history } from 'umi';

// 创建上下文
export const tagListContext = createContext(null);
const NavSetting = () => {
  const [tagList, setTagList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetMenuMy().then(({ success, data }) => {
      if (success) {
        setTagList(data);
        setLoading(false);
      }
    });
  }, []);
  const handleSave = () => {
    const savedList = [];
    tagList.map((item) => {
      savedList.push(item.id);
    });

    SaveMyMenu({ savedList: savedList }).then(({ success }) => {
      if (success) {
        message.success('保存成功');
      }
    });
  };

  const handleClick = () => {
    setClicked(true);
  };

  const handleCancel = () => {
    history.push('/home');
  };

  return (
    <div>
      <Spin spinning={loading}>
        <div>asdasd</div>
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
      </Spin>
    </div>
  );
};

export default NavSetting;
