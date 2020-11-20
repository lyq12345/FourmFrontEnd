
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import styles from './styles.less'


const TableList = (props) => {
  // const [dataList, setDataList] = useState([]);
  // const [pageSize, setPageSize] = useState(10);
  // const [pageIndex, setPageIndex] = useState(1);
  let { data, total, loading } = props
  const columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      // fixed: 'right',
      width: 300,
      render: (record) => <div className={styles.operation}>
        <a onClick={() => window.open(`birthdayWish/BlessingWall?wishType=${2}&userId=${record.userId}`)}>查看ta收到的</a>
        <a>送祝福</a>
      </div>,
    },
  ]

  useEffect(() => {
    // if (!date) {
    //   return
    // }
    // getBirthdayListInfo()
  }, [])
  const onChangePage = () => {

  }
  return (
    <div className={styles.tableList}>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowClassName={(record, index) => index % 2 !== 0 ? styles.white : styles.gray}
      />
    </div>
  )

}
export default TableList