
import React, { useEffect, useState } from 'react'
import {
  Form, Input, Button, Row, Col, Cascader, Select, Table,
  Tag, Space, message, DatePicker, Popconfirm, Modal
} from 'antd';
import styles from './styles.less'
import { listCityInfosByParentId } from '@/api/public'
import { getFamilyInfo } from '@/api/personalHomepage'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const TableArea = (props) => {
  const { Option } = Select;
  const [dataList, setDataList] = useState([
    {
      FAMSAStr: '',
      FANAM: '',
      TELNR: '',
      FGBDT: '',
      STRAS: '',
    }
  ]);
  const [isFamilyNum, setFamilyNum] = useState(false)
  const [addressoptionsList, setAddressoptionsList] = useState([]);
  let { famsaList } = props
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
    getFamilyInfo({ sapId: 127350 }).then(res => {
      if (res.success) {
        setDataList(res.familyInfo)
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
  const cascaderChange = (value, selectedOptions, variables, val) => {
    // let addressDeatil = selectedOptions[selectedOptions.length - 1].mergeName
    // if (variables == 'exigenceDetailInfo') {
    //   let exigenceDetail = exigenceDetailInfo
    //   exigenceDetail.STRAS = addressDeatil.replace(/,/g, '')
    //   setExigenceDetailInfo(exigenceDetail)
    // } else {
    //   let personageDetail = personageDetailInfo
    //   personageDetail.ZZHUKOL = val == 'hukouLocation' ? addressDeatil.replace(/,/g, '') : personageDetail.ZZHUKOL
    //   personageDetail.HOME_ADD = val == 'homeAddress' ? addressDeatil.replace(/,/g, '') : personageDetail.HOME_ADD
    //   personageDetail.POST_ADD = val == 'mailAddress' ? addressDeatil.replace(/,/g, '') : personageDetail.POST_ADD
    //   setPersonageDetailInfo(personageDetail)
    // }
  }
  // 选择框change
  const assignmentChange = (value, name, index, dataName, type) => {
    let val = ''
    if (type == 'input') {
      val = value.nativeEvent.data
    } else {
      val = value
    }
    let tableArr = [...dataList]
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
      value={record.FAMSA}
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
      onChange={(value) => { assignmentChange(value, record, index, dataName, 'input') }}
      style={{ width: styleNum ? 125 : 136, marginLeft: styleNum ? '4px' : '0', }}
      autoComplete="off"
      value={dataName == 'STRAS' ? '' : text}
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
      dataIndex: 'FAMSAStr',
      key: 'FAMSAStr',
      width: 136,
      render: (text, record, index, dataIndex) => {
        return (
          <div>
            {
              isFamilyNum ? getSelect(text, record, index, 'FAMSAStr') : <span>{text}</span>
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
              isFamilyNum ? getInput(text, record, index, 'FANAM') : <span>{text}</span>
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
              isFamilyNum ? getInput(text, record, index, 'TELNR') : <span>{text}</span>
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
                format="YYYY-MM-DD"
                style={{ width: 136 }} /> : <span>{text}</span>
            }
          </div>
        )
      },
    },
    {
      title: '地址',
      key: 'STRAS',
      dataIndex: 'STRAS',
      width: 500,
      render: (text, record, index) => {
        return (
          <div>
            {
              isFamilyNum ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {
                    // getSelect(text, record, index)
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={addressoptionsList}
                      autoComplete="off"
                      loadData={loadData}
                      style={{ width: 136 }}
                      onChange={(val, data) => cascaderChange(val, data, 'personageDetailInfo', 'hukouLocation')}
                    />
                  }
                  {
                    getInput(text, record, index, 'STRAS', 125)
                  }
                  <span style={{ marginLeft: '5px', display: 'flex', alignItems: 'flex-end', cursor: 'pointer' }}>
                    {
                      record.OBJPS ? <></> :
                        <DeleteOutlined onClick={() => removeRow(index)} />
                    }
                  </span>


                </div>
                : <span>{text}</span>
            }
          </div>
        )
      },
    },
  ];
  const familyNumSubmit = () => {
    debugger
    console.log(dataList)
    let isError = true
    dataList.forEach(item => {
      if (!isObjEmpty(item)) {
        isError = false
        return
      }
    })
    if (!isError) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
  }
  const createRow = () => {
    let arr = [...dataList]
    arr.push({
      FAMSAStr: '',
      FANAM: '',
      TELNR: '',
      FGBDT: '',
      STRAS: '',
    })
    setDataList(arr)
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
        rowKey={record => record.id}
        pagination={false}
        columns={columns}
        dataSource={dataList} />
      <div className={styles.operationBtn} style={{ marginTop: '30px' }}>
        <Button style={{ marginRight: '26px' }} onClick={() => setFamilyNum(false)}>
          取消
              </Button>
        {
          isFamilyNum ?
            <Button style={{ marginRight: '26px' }} onClick={createRow}>
              增加
              </Button> : <></>
        }
        <Button type="primary" onClick={() => familyNumSubmit()}>
          保存
              </Button>
      </div>
    </div>
  )
}
export default TableArea