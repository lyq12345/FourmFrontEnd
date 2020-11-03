import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import ListData from '@/components/ListData'
import { Pagination } from 'antd';
import { withRouter } from 'umi';
import { GetAffairPerson } from '@/api/common'

const HallPeople = (props) => {
  const [ListDataInfo, setListDataInfo] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)

  useEffect(() => {
    getGetAffairPersonList(1)
  }, [])
  const onChangePage = (page) => {
    setCurrentPage(page)
    getGetAffairPersonList(page)
  }
  const getGetAffairPersonList = (page) => {
    GetAffairPerson({ pageIndex: page }).then(response => {
      if (response.success) {
        setListDataInfo(response.data)
        setTotal(response.data.total)
      }
    })
  }
  const routerLink = (val) => {
    props.history.push({
      pathname: '/hall-people/detail',
      state: { id: val.id },
    });
  }
  return (
    <div className={styles.hallPeople}>
      <ListData isShowWeek isLine isInfoIntro routerLink={routerLink} ListDataInfo={ListDataInfo} />
      <div className={styles.pagination}>
        <Pagination className={styles.paginationNum} onChange={onChangePage} current={currentPage} size="small" total={total} />
      </div>
    </div >
  )
}
export default HallPeople