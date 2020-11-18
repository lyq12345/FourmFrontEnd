
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import PaginationModule from '@/components/PaginationModule'
import styles from './styles.less'


const TableList = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '部门',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      // fixed: 'right',
      width: 300,
      render: () => <div className={styles.operation}>
        <a>查看ta收到的</a>
        <a>送祝福</a>
      </div>,
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '5',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '5',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
  ]
  const onChangePage = () => {

  }
  return (
    <div className={styles.tableList}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) => index % 2 !== 0 ? styles.white : styles.gray}
      />
      <PaginationModule onChange={onChangePage} current={currentPage} size="small" total={total} />
    </div>
  )

}
export default TableList