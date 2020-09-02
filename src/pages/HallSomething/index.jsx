import React from 'react'
import styles from './styles.less'
import ListData from '@/components/ListData'
import { Pagination } from 'antd';

const HallPeople = () => {

  return (
    <div className={styles.hallPeople}>
      <ListData isStickIcon />
      <div className={styles.pagination}>
        <Pagination className={styles.paginationNum} size="small" total={50} />
      </div>
    </div >
  )
}
export default HallPeople