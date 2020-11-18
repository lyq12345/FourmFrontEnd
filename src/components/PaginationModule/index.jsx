import React from 'react'
import { Pagination } from 'antd';

import styles from './styles.less'

const PaginationModule = (props) => {
  let { current, total, onChangePage = () => { } } = props
  return (
    <div className={styles.paginationModule}>
      <Pagination className={styles.paginationNum} onChange={onChangePage} current={current} size="small" total={total} />
    </div>
  )
}
export default PaginationModule