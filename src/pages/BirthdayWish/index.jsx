import React, { useState, useEffect } from 'react'
import { Tabs, Pagination } from 'antd';

import TableList from './components/TableList'
import { GetBirthdayList } from '@/api/birthdayWish'
import PaginationModule from '@/components/PaginationModule'
import mySendWish from '@/assets/img/mySendWish.png'
import myWish from '@/assets/img/myWish.png'


import styles from './styles.less'

const { TabPane } = Tabs;
const BirthdayWishList = (props) => {

  const [dateTab, setDateTab] = useState([]);
  const [tableIndexDate, setTableIndexDate] = useState([]);
  const [yearDateArr, setYearDateArr] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [total, setTotal] = useState(1)
  const [loadingList, setLoadingList] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))



  useEffect(() => {
    getDate()
    let date = new Date();
    let base = new Date(date).getTime();
    let time = new Date(base);
    setTableIndexDate([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-'))
    getBirthdayListInfo([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-'), 1)
  }, [])
  const getDate = () => {
    let date = new Date();
    let base = new Date(date).getTime();
    let oneDay = 24 * 3600 * 1000;
    let dateArr = [];
    let data = [Math.random() * 300];
    let time = new Date(base);
    let dateList = [[time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-')]
    // 获取今天日期
    // date.push([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('.'));
    dateArr.push('今天')
    for (let i = 1; i < 8; i++) {//控制需要的天数
      let now = new Date(base += oneDay); //这里控制往前一周还是往后一周
      dateArr.push([now.getMonth() + 1, now.getDate()].join('.'));
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));

      dateList.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'))
    }
    setYearDateArr(dateList)
    // var newdate = date.reverse(); //往后一周的话需要将数组倒叙，完后不需要
    setDateTab(dateArr)
    setTableIndexDate([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-'))
  }

  const getBirthdayListInfo = (val, page) => {
    let params = {
      date: val || tableIndexDate,
      pageSize: pageSize,
      pageIndex: page
    }
    setLoadingList(true)
    GetBirthdayList(params).then(res => {
      setLoadingList(false)
      if (res.success) {
        setDataList(res.data.employs || [])
        setTotal(res.data.total || 1)
      }
    })
  }
  const callback = (key) => {
    getBirthdayListInfo(yearDateArr[key], 1)
    setTableIndexDate(yearDateArr[key])
    setCurrentPage(1)
  }
  const onChangePage = (page) => {
    setCurrentPage(page)
    getBirthdayListInfo(tableIndexDate, page)
  }
  return (
    <>
      <div className={styles.birthdayTabsContainer}>
        <div className={styles.birthdayWish}>
          <p onClick={() => window.open(`/yst-iwork-alpha/birthday-wish/myReceiveWish?wishType=${2}&userId=${userInfo && userInfo.account}&type=${2}`)}>
            <img src={mySendWish} alt="" />
            <span>我收到的祝福</span>
          </p>
          <p onClick={() => window.open(`/yst-iwork-alpha/birthday-wish/SendWishList?wishType=${1}&userId=${userInfo && userInfo.account}`)}>
            <img src={myWish} alt="" />
            <span>我送出的祝福</span>
          </p>
        </div>
        <Tabs
          className={styles.navTabs}
          defaultActiveKey="0"
          type='card'
          onChange={callback}
        >
          <TabPane tab={<span>{dateTab[0]}</span>} key="0">
            <TableList data={dataList} total={total} loading={loadingList} />
            {/* <PaginationModule onChange={onChangePage} current={currentPage} size="small" total={total} /> */}
          </TabPane>
          <TabPane tab={<span>{dateTab[1]}</span>} key="1">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[2]}</span>} key="2">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[3]}</span>} key="3">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[4]}</span>} key="4">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[5]}</span>} key="5">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[6]}</span>} key="6">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[7]}</span>} key="7">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
          <TabPane tab={<span>{dateTab[8]}</span>} key="8">
            <TableList data={dataList} total={total} loading={loadingList} />
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.birthdayPagination}>
        <Pagination className={styles.paginationNum} onChange={onChangePage} current={currentPage} size="small" total={total} />
      </div>
    </>
  )
}
export default BirthdayWishList