
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import styles from './styles.less'
import WishDialog from '@/components/WishDialog'


const TableList = (props) => {
  // const [dataList, setDataList] = useState([]);
  // const [pageSize, setPageSize] = useState(10);
  // const [pageIndex, setPageIndex] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [isDialog, setIsDialog] = useState(false);
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
        <a onClick={() => window.open(`birthday-wish/BlessingWall?wishType=${2}&userId=${record.userId}&type=${1}&userName=${record.userName}&avater=${record.avater}`)}>查看ta收到的</a>
        <span onClick={() => sendWishClick(record)}>送祝福</span>
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
  const sendWishClick = (val) => {
    setUserInfo(val)
    setIsDialog(true)
  }
  const closeDialog = () => {
    setIsDialog(false)
  }
  return (
    <div className={styles.tableList}>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record, index) => record.userId}
        pagination={false}
        rowClassName={(record, index) => index % 2 !== 0 ? styles.white : styles.gray}
      />
      <WishDialog userInfo={userInfo} isDialog={isDialog} closeDialog={closeDialog} />
    </div>
  )

}
export default TableList