import React, { useState } from 'react';
import { List, message, Avatar, Spin } from 'antd';
import styles from './styles.less'
import PaginationModule from '@/components/PaginationModule'

const SendWishList = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)

  const data = [
    {
      userName: '111',
      content: 'Ant Design Title 1',
      time: '2020-11-19'
    },
    {
      userName: '111',
      content: 'Ant Design Title 1',
      time: '2020-11-19'
    }, {
      userName: '111',
      content: 'Ant Design Title 1',
      time: '2020-11-19'
    },
    {
      userName: '111',
      content: 'Ant Design Title 1',
      time: '2020-11-19'
    },
  ];
  const onChangePage = () => {

  }
  return (
    <div className={styles.sendWishList}>
      <p>我送出的祝福</p>
      {
        data.length && data.map((item, index) => (
          <div className={styles.contentInfo}>
            <div className={styles.contentList}>
              <div className={styles.leftImg}>
                {/* <img src="" alt=""/> */}
              </div>
              <div className={styles.rightContent}>
                <p>{item.userName}</p>
                <p>{item.content}</p>
                <p>{item.time}</p>
              </div>
            </div>
            <div className={styles.messageReply}>
              <p>回复：</p>
            </div>
          </div>
        ))
      }
      <PaginationModule onChange={onChangePage} current={currentPage} size="small" total={total} />
    </div>
  )
}

export default SendWishList