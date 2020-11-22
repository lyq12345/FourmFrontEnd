
import React, { useEffect, useState } from 'react'
import {
  Form, Input, Button, Row, Col, Cascader, Select, Table,
  Tag, Space, message, DatePicker, Popconfirm, Modal
} from 'antd';
import styles from './styles.less'
import { listCityInfosByParentId } from '@/api/public'
import { getFamilyInfo, editFamilyInfo } from '@/api/personalHomepage'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment'
import { getCommonRules } from '@/constants/rules';

const TableArea = (props) => {
  const { Option } = Select;
  const [dataList, setDataList] = useState([
    {
      PERNR: '',
      FAMSA: '',
      FANAM: '',
      TELNR: '',
      LAND1: '',
      STATE: '',
      CITY1: '',
      DISTR: '',
      STRAS: '',
      FASEX: '1',
      FGBDT: '',
      Type: 0,
      key: 0
    }
  ]);
  // const [tableList, setTableList] = useState([]);
  const [isFamilyNum, setFamilyNum] = useState(false)
  const [btnLoadding, setBtnLoadding] = useState(false);
  const [addressoptionsList, setAddressoptionsList] = useState([]);
  const [storgeDataList, setStorgeDataList] = useState([]);
  let { famsaList, tableList, FID } = props
  useEffect(() => {
    console.log(props)
    listCityInfosByParentId({ parentId: 100000 }).then(res => {
      res.data.map(item => {
        item.isLeaf = false
        item.children = null
        return item
      })
      setAddressoptionsList(res.data)
    })
    getFamilyInfo({ sapId: FID }).then(res => {
      if (res.success) {
        res.familyInfo.map((item, index) => { item.key = index })
        let dataArr = JSON.parse(JSON.stringify(res.familyInfo))
        setStorgeDataList(dataArr)
        setDataList([...res.familyInfo])
      }
    })
  }, [])


  const getListCityInfosByParentId = (val, selectedOptions) => {
    let areaList = []
    const targetOption = selectedOptions[selectedOptions.length - 1];
    listCityInfosByParentId({ parentId: val }).then(res => {
      if (selectedOptions[selectedOptions.length - 1].level != 3) {
        res.data.map(item => {
          item.isLeaf = false
          return item
        })
      }
      if (selectedOptions[selectedOptions.length - 1].level == 3) {
        res.data.map(item => {
          item.children = null
          return item
        })
      }
      targetOption.children = res.data
      setAddressoptionsList([...addressoptionsList])
    })
  }
  // 级联加载下一级
  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    listCityInfosByParentId({ parentId: targetOption.id }).then(res => {
      targetOption.loading = false;
      if (selectedOptions[selectedOptions.length - 1].level != 3) {
        res.data.map(item => {
          item.isLeaf = false
          item.children = null
          return item
        })
      }
      if (selectedOptions[selectedOptions.length - 1].level == 3) {
        res.data.map(item => {
          item.children = null
          return item
        })
      }
      targetOption.children = res.data
      setAddressoptionsList([...addressoptionsList])
    })
  };
  // 级联change
  const cascaderChange = (value, selectedOptions, record, index, dataName) => {
    let tableArr = [...dataList]
    let addressDeatil = selectedOptions[selectedOptions.length - 1].mergeName
    tableArr[index][dataName] = addressDeatil.replace(/,/g, '')
    tableArr[index].STRAS = record.DETAIL_STRAS ? tableArr[index][dataName] + record.DETAIL_STRAS : ''
    setDataList(tableArr)
  }
  // 选择框change
  const assignmentChange = (value, record, index, dataName, type) => {
    let tableArr = [...dataList]
    let val = ''
    if (type == 'input') {
      val = value.currentTarget.defaultValue
      if (dataName === 'DETAIL_STRAS') {
        tableArr[index].STRAS = record.ADDRESS ? record.ADDRESS + val : ''
      }
    } else {
      val = value
    }
    tableArr[index][dataName] = val
    setDataList(tableArr)
  }
  // 选择框
  const getSelect = (text, record, index, dataName) => (
    <Select
      onChange={value => {
        assignmentChange(value, record, index, dataName);
      }}
      showSearch
      style={{ width: 136 }}
      defaultValue={record.FAMSA || null}
      placeholder="请选择"
    >
      {famsaList &&
        famsaList.map(item => (
          <Option key={item.FDateNum} value={item.FDateNum}>
            {item.FDateName}
          </Option>
        ))}
    </Select>
  );
  const getInput = (text, record, index, dataName, styleNum) => (
    <Input
      onBlur={(value) => { assignmentChange(value, record, index, dataName, 'input') }}
      style={{ width: styleNum ? 125 : 136, marginLeft: styleNum ? '4px' : '0', }}
      autoComplete="off"
      defaultValue={dataName == 'DETAIL_STRAS' ? '' : text}
      placeholder="请输入" />
  );
  // 删除行
  const removeRow = (index) => {
    Modal.confirm({
      title: '确认要删除吗?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        let dataArr = [...dataList]
        dataArr.splice(index, 1)
        setDataList(dataArr)
      },
    });
  }
  const columns = [
    {
      title: '与本人关系',
      dataIndex: 'FAMSA',
      key: 'FAMSA',
      width: 136,
      render: (text, record, index, dataIndex) => {
        return (
          <div>
            {
              isFamilyNum ? getSelect(text, record, index, 'FAMSA') : <span>{record.FAMSAStr ? record.FAMSAStr : '--'}</span>
            }
          </div>
        )
      },
    },
    {
      title: '姓名',
      dataIndex: 'FANAM',
      key: 'FANAM',
      width: 136,
      render: (text, record, index) => {
        return (
          <div>
            {
              isFamilyNum ? getInput(text, record, index, 'FANAM') : <span>{text ? text : '--'}</span>
            }
          </div>
        )
      },
    },
    {
      title: '联系方式',
      dataIndex: 'TELNR',
      key: 'TELNR',
      width: 136,
      render: (text, record, index) => {
        return (
          <div>
            {
              isFamilyNum ? getInput(text, record, index, 'TELNR') : <span>{text ? text : '--'}</span>
            }
          </div>
        )
      },
    },
    {
      title: '出生日期',
      key: 'FGBDT',
      dataIndex: 'FGBDT',
      width: 136,
      render: (text, record, index) => {
        return (
          <div>
            {
              isFamilyNum ? <DatePicker
                onChange={(value, data) => { assignmentChange(data, record, index, 'FGBDT', 'DatePicker') }}
                defaultValue={text ? moment(text) : null}
                format="YYYY-MM-DD"
                style={{ width: 136 }} /> : <span>{text ? text : '--'}</span>
            }
          </div>
        )
      },
    },
    {
      title: '地址',
      key: 'ADDRESS',
      dataIndex: 'ADDRESS',
      width: 500,
      render: (text, record, index) => {
        return (
          <div>
            {
              isFamilyNum ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={addressoptionsList}
                      autoComplete="off"
                      loadData={loadData}
                      style={{ width: 136 }}
                      onChange={(val, data) => cascaderChange(val, data, record, index, 'ADDRESS')}
                    />
                  }
                  {
                    getInput(text, record, index, 'DETAIL_STRAS', 125)
                  }
                  <span style={{ marginLeft: '5px', display: 'flex', alignItems: 'flex-end', cursor: 'pointer' }}>
                    {
                      record.Type === 1 ? <></> :
                        <DeleteOutlined onClick={() => removeRow(index)} />
                    }
                  </span>


                </div>
                // <span>{record.STATE}{record.CITY1}{record.DISTR}{record.STRAS}</span>
                : <span>{record.STRAS}</span>
            }
          </div>
        )
      },
    },
  ];
  const buildMap = (obj) => {
    return Object.keys(obj).reduce(
      (map, key) => map.set(key, obj[key]),
      new Map()
    );
  }
  const isObjEmptyFamily = (tableArr) => {
    let filedObj = {
      TELNR: '',
      FGBDT: '',
      FAMSA: '',
      FANAM: '',
      STRAS: '',
      ADDRESS: '',
      DETAIL_STRAS: '',
    }
    let isDifferent = true
    tableArr.forEach((val, index) => {
      Object.keys(filedObj).map(function (i) {
        Object.keys(val).map(function (v) {
          if ((i === v) && (!tableArr[index][v])) {
            isDifferent = false
            return isDifferent
          }
        })
      })
    });
    return isDifferent
  }
  // 手机号码校验
  const isChecking = (arr) => {
    let isError = true
    arr.map(item => {
      if (!/^1[3456789]\d{9}$/.test(item.TELNR)) {
        isError = false
        return isError
      }
    })
    return isError
  }

  // 家庭成员提交
  const familyNumSubmit = () => {
    const tableArr = [...dataList]
    let isError = true
    tableArr.forEach(item => item.PERNR = FID)
    setDataList(tableArr)
    if (!isObjEmptyFamily(tableArr)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    if (!isChecking(tableArr)) {
      message.error('手机号码格式不正确')
      return false
    }
    setBtnLoadding(true)
    editFamilyInfo({ data: JSON.stringify(tableArr) }).then(res => {
      setBtnLoadding(false)
      if (res.success) {
        const arrList = [...dataList]
        message.success('操作成功')
        arrList.forEach(item => {
          if (item.FAMSA) {
            const famst = famsaList.find(v => v.FDateNum === item.FAMSA)
            item.FAMSAStr = famst.FDateName
          }
          item.Type = 1
        })
        // let newObj = {}
        // let newArr = [];
        // arrList.forEach(function (item, i) {
        //   for (var key in item) {
        //     if (key != 'id') {
        //       newObj[key] = item[key];
        //     }
        //   }
        //   newArr.push(newObj);
        //   newObj = {};//这步至关重要，每循环一次，都要清空一次，否则拿到的数据总是最后一条
        // });
        // console.log(newArr, newObj)
        setDataList(arrList)
        setFamilyNum(false)
        // setStorgeDataList(arrList)
      } else {
        setDataList([...storgeDataList])
      }
    })
  }
  const createRow = () => {
    let arr = [...dataList]
    arr.push({
      PERNR: '',
      FAMSA: '',
      FANAM: '',
      TELNR: '',
      LAND1: '',
      STATE: '',
      CITY1: '',
      DISTR: '',
      STRAS: '',
      FASEX: '',
      FGBDT: '',
      Type: 0,
      key: dataList.length + 1
    })
    setDataList(arr)
  }
  const cancelRowData = () => {
    setFamilyNum(false)
    console.log(storgeDataList)
    setDataList([...storgeDataList])
  }
  return (
    <div>
      <div className={styles.infoTitle}>
        <p>家庭成员 请填写父母、配偶、子女、兄弟姐妹的具体信息</p>
        {
          !isFamilyNum ? <p className={styles.isUpdate} onClick={() => setFamilyNum(true)}>修改</p> : <></>
        }
      </div>
      <Table
        rowClassName={() => 'editable-row'}
        className='tableBackgroundStylesd'
        // rowKey={(record, index) => index}
        rowKey={(record) => record.key}
        pagination={false}
        columns={columns}
        dataSource={dataList} />
      <div className={styles.operationBtn} style={{ marginTop: '30px' }}>

        {
          isFamilyNum ?
            <>
              <Button style={{ marginRight: '26px' }} onClick={() => cancelRowData()}>
                取消
              </Button>
              <Button style={{ marginRight: '26px' }} onClick={createRow}>
                增加
              </Button>
              <Button type="primary" loading={btnLoadding} onClick={() => familyNumSubmit()}>
                保存
              </Button>
            </>
            : <></>
        }
      </div>
    </div>
  )
}
export default TableArea