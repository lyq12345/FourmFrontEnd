import React, { useEffect } from 'react'
import styles from './styles.less'
import ListData from '@/components/ListData'
import { Pagination } from 'antd';
import { withRouter } from 'umi';

const PersonalHomepage = (props) => {

  useEffect(() => {

  }, [])
  const routerLink = () => {
    props.history.push({
      pathname: '/hall-something/detail',
    });
  }
  return (
    <div className={styles.hallPeople}>
      <ListData isStickIcon routerLink={routerLink} />
      <div className={styles.pagination}>
        <Pagination className={styles.paginationNum} size="small" total={50} />
      </div>
    </div >
  )
}
export default withRouter(PersonalHomepage)