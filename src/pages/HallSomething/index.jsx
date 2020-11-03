import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import ListData from '@/components/ListData'
import { GetAffair } from '@/api/common'
import { Pagination } from 'antd';
import { withRouter } from 'umi';

const HallSomething = (props) => {
  const [ListDataInfo, setListDataInfo] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const { state } = props.location
  useEffect(() => {
    getAffairList(1)
  }, [])
  const onChangePage = (page) => {
    setCurrentPage(page)
    getAffairList(page)
  }
  const getAffairList = (page) => {
    GetAffair({ pageIndex: page }).then(response => {
      if (response.success) {
        setListDataInfo(response.data)
        setTotal(response.data.total)
      }
    })
  }
  const routerLink = (val) => {
    props.history.push({
      pathname: '/hall-something/detail',
      state: { id: val.id },
    });
  }
  return (
    <div className={styles.hallPeople}>
      <ListData isStickIcon routerLink={routerLink} ListDataInfo={ListDataInfo} />
      <div className={styles.pagination}>
        <Pagination className={styles.paginationNum} onChange={onChangePage} current={currentPage} size="small" total={total} />
      </div>
    </div >
  )
}
export default withRouter(HallSomething)