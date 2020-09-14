import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Cascader, Select, Table, Tag, Space, message, DatePicker } from 'antd';
import styles from './styles.less'
import {
  GetEmpInfo, getPernrInfo,
  EditEmpInfo, updatePernrInfo, getFamilyInfo,
  addFamilyInfo, updateFamilyInfo
} from '@/api/personalHomepage'
import { DeleteOutlined } from '@ant-design/icons';

const FormData = (props) => {

  const [contactInfoForm] = Form.useForm();
  const [personageInfoForm] = Form.useForm();
  const [emergencyContactForm] = Form.useForm();
  const [isContactInfo, setIsContactInfo] = useState(false)
  const [isPersonageInfo, setIsPersonageInfo] = useState(false)
  const [isEmergencyContact, setIsEmergencyContact] = useState(false)
  const [isFamilyNum, setFamilyNum] = useState(false)
  const [detailInfo, setDetailInfo] = useState({});
  const [personageDetailInfo, setPersonageDetailInfo] = useState({});
  const [exigenceDetailInfo, setExigenceDetailInfo] = useState({});
  const [dataList, setDataList] = useState([]);
  const [pcodeList, setPcodeList] = useState([]);
  const [zzhukotypeList, setZzhukotypeList] = useState([]);
  const [famstList, setFamstList] = useState([]);
  const [famsaList, setFamsaList] = useState([]);
  const [stateList, setStateList] = useState([]);


  useEffect(() => {
    info()
  }, [])
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  };
  const personalInfoSubmit = (values) => {
    const item = pcodeList.find(v => v.FDateNum === values.PCODE)
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    updatePernrInfo(values).then(res => {
      if (res.success) {
        message.success('操作成功')
        const creatData = saveSucAssignment(values, personageDetailInfo)
        setPersonageDetailInfo(creatData)
        setIsPersonageInfo(false)
      }
    })
  }
  // 联系方式
  const contactWaySubmit = (values) => {
    values.FCompanName = detailInfo.FCompanName
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    EditEmpInfo(values).then(res => {
      if (res.success) {
        message.success('操作成功')
        const creatData = saveSucAssignment(values, detailInfo)
        setDetailInfo(creatData)
        setIsContactInfo(false)
      }
    })
  }
  const saveSucAssignment = (val, info) => {
    Object.keys(info).map(function (i) {
      Object.keys(val).map(function (v) {
        if (i === v) {
          info[i] = val[i]
        }
      })
    })
    return info
  }
  const isObjEmpty = (obj) => {
    let flag = true;
    Object.keys(obj).map(function (i) {
      if (!obj[i]) {
        flag = false
        return flag
      }
    })
    return flag
  }
  const info = () => {
    GetEmpInfo({ userId: 111 }).then(res => {
      if (res.success) {
        setDetailInfo(res.EmpInfo)
      }
    })
    getPernrInfo({ sapId: 111 }).then(res => {
      if (res.success) {
        setPersonageDetailInfo(res.pernrInfo)
        setPcodeList(res.pcodeList)
        setZzhukotypeList(res.zzhukotypeList)
        setFamstList(res.famstList)
        setFamsaList(res.famsaList)
      }
    })
    getFamilyInfo({ sapId: 111 }).then(res => {
      if (res.success) {
        setExigenceDetailInfo(res.exigence)
        setDataList(res.familyInfo)
      }
    })
  }
  // 个人信息
  // const onFinish = (form) => {
  //   debugger
  //   console.log(form)
  // }
  // 紧急联系人
  const emergencyContactSubmit = (values) => {
    values.PERNR = '11'
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    let data = []
    data.push(values)
    addFamilyInfo({ data: data }).then(res => {
      if (res.success) {
        const creatData = saveSucAssignment(values, detailInfo)
        setExigenceDetailInfo(creatData)
        setIsEmergencyContact(false)
      }
    })
  }
  // 修改
  const updateFormData = (val) => {
    switch (val) {
      case 1:
        contactInfoForm.setFieldsValue(detailInfo)
        setIsContactInfo(true)
        break;
      case 2:
        personageInfoForm.setFieldsValue(personageDetailInfo)
        setIsPersonageInfo(true)
        break;
      case 3:
        emergencyContactForm.setFieldsValue(exigenceDetailInfo)
        setIsEmergencyContact(true)
        break;
      case 4:
        setFamilyNum(true)
        break;
    }
  }

  const familyNumSubmit = () => {

  }
  const handleChange = () => { }
  const getSelect = (text, record, index) => (
    <Select
      onChange={value => {
        handleChange(value, 'repoCode', index);
      }}
      showSearch
      style={{ width: 136 }}
      value={record.repoCode}
      placeholder="请选择"
    >
      {/* {whoAddress &&
        whoAddress.map(item => (
          <Option title={item.repoAddr} key={item.repoCode} value={item.repoCode}>
            {item.repoAddr}
          </Option>
        ))} */}
    </Select>
  );
  const getInput = (text, record, index, styleNum) => (
    <Input style={{ width: styleNum ? 125 : 136, marginLeft: styleNum ? '4px' : '0', }} autoComplete="off" placeholder="请输入" />
  );
  const columns = [
    {
      title: '与本人关系',
      dataIndex: 'FAMSAStr',
      key: 'FAMSAStr',
      width: 136,
      render: (text, record, index) => {
        return (
          <div>
            {
              isFamilyNum ? getSelect(text, record, index) : <span>{text}</span>
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
              isFamilyNum ? getInput(text, record, index) : <span>{text}</span>
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
              isFamilyNum ? getInput(text, record, index) : <span>{text}</span>
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
              isFamilyNum ? <DatePicker style={{ width: 136 }} /> : <span>{text}</span>
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
                    getSelect(text, record, index)
                  }
                  {
                    getInput(text, record, index, 125)
                  }
                  <span style={{ marginLeft: '5px', display: 'flex', alignItems: 'flex-end' }}>
                    <DeleteOutlined />
                  </span>
                </div>
                : <span>{text}</span>
            }
          </div>
        )
      },
    },
  ];
  return (
    <div className={styles.homePageForm}>
      {/* 基本信息 */}
      <div className={styles.basicInfo}>
        <div className={styles.infoTitle}>
          基本信息
        </div>
        <Form
          {...formItemLayout}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={8}>
              <Form.Item label="姓名：" style={{ marginBottom: '17px' }} name="orgId">
                <span>{detailInfo && detailInfo.FItemName}</span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="性别" name="operatorId">
                <span>{detailInfo && detailInfo.FSex === 1 ? '男' : '女'}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工号：" name="operationPersonAccount">
                <span>{detailInfo && detailInfo.FID} </span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="账号" name="marketPersonAccount">
                <span>{detailInfo && detailInfo.FItemNumber}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="部门岗位：" name="operationPersonAccount">
                <span>{detailInfo && detailInfo.FPositionName} </span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="司龄时间" name="marketPersonAccount">
                <span>{detailInfo && detailInfo.FEnterGroupDate}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="职级" name="operationPersonAccount">
                <span>{detailInfo && detailInfo.FJobLevel}</span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      {/* 联系方式 */}
      <div className={styles.contactWay}>
        <div className={styles.infoTitle}>
          <p>联系方式</p>
          {
            !isContactInfo ? <p className={styles.isUpdate} onClick={() => updateFormData(1)}>修改</p> : <></>
          }
        </div>
        <Form
          form={contactInfoForm}
          {...formItemLayout}
          onFinish={contactWaySubmit}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="办公电话" name="FTelePhone">
                {
                  isContactInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{detailInfo && detailInfo.FTelePhone}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="隶属公司" name="FCompanName">
                <span>{detailInfo && detailInfo.FCompanName}</span>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="手机号码" name="FMobiePhone">
                {
                  isContactInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{detailInfo && detailInfo.FMobiePhone}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="办公地址" name="FAdress">
                {
                  isContactInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{detailInfo && detailInfo.FAdress}</span>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            isContactInfo ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }} onClick={() => setIsContactInfo(!isContactInfo)}>
                取消
              </Button>
              <Button type="primary" htmlType="contactWaySubmit">
                保存
              </Button>
            </div> : <></>
          }
        </Form>
      </div>
      {/* 个人信息 */}
      <div>
        <div className={styles.infoTitle}>
          <p>个人信息</p>
          {
            !isPersonageInfo ? <p className={styles.isUpdate} onClick={() => updateFormData(2)}>修改</p> : <></>
          }
        </div>
        <Form
          {...formItemLayout}
          form={personageInfoForm}
          onFinish={personalInfoSubmit}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="政治面貌：" name="PCODE">
                {
                  isPersonageInfo ? <Select style={{ width: '210px' }} allowClear>
                    {pcodeList &&
                      pcodeList.map((item) => (
                        <Option key={item.FDateNum} value={item.FDateNum}>
                          {item.FDateName}
                        </Option>
                      ))}
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.PCODE} </span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="婚姻状况：" name="FAMST">
                {
                  isPersonageInfo ? <Select style={{ width: '210px' }} allowClear>
                    {famstList &&
                      famstList.map((item) => (
                        <Option key={item.FDateNum} value={item.FDateNum}>
                          {item.FDateName}
                        </Option>
                      ))}
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.FAMST} </span>
                }

              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="子女数目：" name="ANZKD">
                {
                  isPersonageInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{personageDetailInfo && personageDetailInfo.ANZKD} </span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="户口类型：" name="ZZHUKOTYPE">
                {
                  isPersonageInfo ? <Select style={{ width: '210px' }} allowClear>
                    {zzhukotypeList &&
                      zzhukotypeList.map((item) => (
                        <Option key={item.FDateNum} value={item.FDateNum}>
                          {item.FDateName}
                        </Option>
                      ))}
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.ZZHUKOTYPE} </span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="户口所在地：" name="ZZHUKOL">
                {
                  isPersonageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.ZZHUKOL} </span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="ZZHUKOL_DETAIL" {...tailLayout}>
                {
                  isPersonageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <></>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="家庭住址：" name="HOME_ADD">
                {
                  isPersonageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.HOME_ADD} </span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="HOME_ADD_DETAIL" {...tailLayout}>
                {
                  isPersonageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <></>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="邮寄地址：" name="POST_ADD">
                {
                  isPersonageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.POST_ADD} </span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="POST_ADD_DETAIL" {...tailLayout}>
                {
                  isPersonageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <></>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            isPersonageInfo ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }} onClick={() => setIsPersonageInfo(!isPersonageInfo)}>
                取消
                  </Button>
              <Button type="primary" htmlType="submit">
                保存
                  </Button>
            </div> : <></>
          }
        </Form>
      </div>
      {/* 紧急联络人 */}
      <div>
        <div className={styles.infoTitle}>
          <p>紧急联络人</p>
          {
            !isEmergencyContact ? <p className={styles.isUpdate} onClick={() => updateFormData(3)}>修改</p> : <></>
          }
        </div>
        <Form
          {...formItemLayout}
          form={emergencyContactForm}
          onFinish={emergencyContactSubmit}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="紧急联系人：" name="FAMSAStr">
                {
                  isEmergencyContact ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>{exigenceDetailInfo && exigenceDetailInfo.FAMSAStr}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="联络人电话：" name="TELNR">
                {
                  isEmergencyContact ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{exigenceDetailInfo && exigenceDetailInfo.TELNR}</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="出生日期：" name="FGBDT">
                {
                  isEmergencyContact ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{exigenceDetailInfo && exigenceDetailInfo.FGBDT}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}></Col>
            <Col span={9}>
              <Form.Item label="联络人地址：" name="STRAS">
                {
                  isEmergencyContact ?
                    <Select style={{ width: '210px' }} allowClear>
                      <Option value="lucy">Lucy</Option>
                    </Select> : <span>{exigenceDetailInfo && exigenceDetailInfo.STRAS}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="STRAS_DETAIL_ADD" {...tailLayout}>
                {
                  isEmergencyContact ? <Input autoComplete="off" placeholder="请输入" /> : <></>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            isEmergencyContact ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }} onClick={() => setIsEmergencyContact(!isEmergencyContact)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </div> : <></>
          }
        </Form>
      </div>
      {/* 家庭成员 请填写父母、配偶、子女、兄弟姐妹的具体信息 */}
      <div>
        <div className={styles.infoTitle}>
          <p>家庭成员 请填写父母、配偶、子女、兄弟姐妹的具体信息</p>
          {
            !isFamilyNum ? <p className={styles.isUpdate} onClick={() => updateFormData(4)}>修改</p> : <></>
          }
        </div>
        <Table className='tableBackgroundStylesd' rowKey='key' pagination={false} columns={columns} dataSource={dataList} />
      </div>
      <div className={styles.operationBtn} style={{ marginTop: '30px' }}>
        <Button style={{ marginRight: '26px' }}>
          取消
              </Button>
        <Button type="primary" onClick={() => familyNumSubmit()}>
          保存
              </Button>
      </div>
    </div >
  )
}
export default FormData