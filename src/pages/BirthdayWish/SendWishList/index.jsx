import React, { useState } from 'react';
import { List, message, Avatar, Spin, Pagination, Button } from 'antd';
import styles from './styles.less'
import { GetWishList } from '@/api/birthdayWish'

const SendWishList = (props) => {
  const [dataList, setDataList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [isSpinning, setISpinning] = useState(false)


  let { query } = props.location

  const getWishListInfo = (page) => {
    let params = {
      userId: query.userId,
      wishType: query.wishType,
      pageSize: 10,
      pageIndex: page
    }
    setISpinning(true)
    GetWishList(params).then(res => {
      setISpinning(false)
      if (res.success) {
        setDataList(res.data.wishList || [])
        setTotal(res.data.total)
      }
    })
  }
  useState(() => {
    getWishListInfo(1)
  }, [])
  const onChangePage = (page) => {
    setCurrentPage(page)
    getWishListInfo(page)
  }
  return (
    <div className={styles.sendWishList}>
      {
        dataList && dataList.length ?
          <>
            <p>我送出的祝福</p>
            {
              isSpinning ? <div spinning={isSpinning} className={styles.spinLoading}>
                <Spin />
              </div> : <></>
            }
            {
              dataList.length && dataList.map((item, index) => (
                <div className={styles.contentInfo} key={index}>
                  <div className={styles.contentList}>
                    <div className={styles.leftImg}>
                      {/* <img src="" alt=""/> */}
                    </div>
                    <div className={styles.rightContent}>
                      <p>{item.userName} 收到 你的礼物</p>
                      <p>赠言：{item.content}</p>
                      <p>时间：{item.time}</p>
                    </div>
                  </div>
                  <div className={styles.messageReply}>
                    <p>回复：{item.replyContent}</p>
                  </div>
                </div>
              ))
            }
            <div className={styles.birthdayPagination}>
              <Pagination className={styles.paginationNum} onChange={onChangePage} current={currentPage} size="small" total={total} />
            </div>
          </> :
          <div className={styles.noContentInfo2}>
            <p>快去送礼物吧～</p>
            <Button type="primary" size="large" onClick={() => window.open('birthday-wish')}>去送祝福</Button>
          </div>
      }

    </div >
  )
}

export default SendWishList