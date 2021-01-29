import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Cascader, Select, Table, Tag, Space, message, DatePicker } from 'antd';
import styles from './styles.less'
import {
  GetEmpInfo, getPernrInfo,
  EditEmpInfo, updatePernrInfo, getFamilyInfo,
  editFamilyInfo
} from '@/api/personalHomepage'
import { listCityInfosByParentId } from '@/api/public'
import { DeleteOutlined } from '@ant-design/icons';
import TableArea from './TableArea'
import moment from 'moment'
import { getCommonRules } from '@/constants/rules';

const FormData = (props) => {

  const [contactInfoForm] = Form.useForm();
  const [personageInfoForm] = Form.useForm();
  const [emergencyContactForm] = Form.useForm();
  const [isContactInfo, setIsContactInfo] = useState(false)
  const [isPersonageInfo, setIsPersonageInfo] = useState(false)
  const [isEmergencyContact, setIsEmergencyContact] = useState(false)
  const [detailInfo, setDetailInfo] = useState({});
  const [personageDetailInfo, setPersonageDetailInfo] = useState({});
  const [personageStorgeInfo, setPersonageStorgeInfo] = useState({})
  const [exigenceDetailInfo, setExigenceDetailInfo] = useState({});
  const [exigenceStorgeInfo, setExigenceStorgeInfo] = useState({})
  const [address, setAddress] = useState({})

  const [pcodeList, setPcodeList] = useState([]);
  const [zzhukotypeList, setZzhukotypeList] = useState([]);
  const [famstList, setFamstList] = useState([]);
  const [famsaList, setFamsaList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [addressoptionsList, setAddressoptionsList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [loadings, setLoadings] = useState([]);




  const { Option } = Select;
  useEffect(() => {
    GetEmpInfo({ userId: props.account }).then(res => {
      if (res.success) {
        setDetailInfo(res.EmpInfo)
      }
    })
    // getEmpInfodata()

  }, [])
  useEffect(() => {
    if (!detailInfo || !detailInfo.FID) {
      return
    }
    info()
  }, [detailInfo && detailInfo.FID])
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  };
  // 选择框数据拼装
  const infoAssemble = (val, values) => {
    let data = values
    if (val == 'personalInfoSubmit') {
      pcodeList.map(item => {
        if (item.FDateNum == data.PCODE) {
          data.PCODEStr = item.FDateName
        }
      })
      famstList.map(item => {
        if (item.FDateNum == data.FAMST) {
          data.FAMSTStr = item.FDateName
        }
      })
      zzhukotypeList.map(item => {
        if (item.FDateNum == data.ZZHUKOTYPE) {
          data.ZZHUKOTYPEStr = item.FDateName
        }
      })
      return data
    }

  }
  const personalInfoSubmit = (values) => {
    const item = pcodeList.find(v => v.FDateNum === values.PCODE)
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    const reg = /^[0-9]+$/;
    if (!reg.test(values.ANZKD)) {
      message.error('子女数目只能输入数字且不能为负')
      return
    }
    values = infoAssemble('personalInfoSubmit', values)
    values.ZZHUKOL = personageDetailInfo.ZZHUKOL
    values.HOME_ADD = personageDetailInfo.HOME_ADD
    values.POST_ADD = personageDetailInfo.POST_ADD
    values.ZZHUKOL = values.ZZHUKOL + values.ZZHUKOL_DETAIL
    values.HOME_ADD = values.HOME_ADD + values.HOME_ADD_DETAIL
    values.POST_ADD = values.POST_ADD + values.POST_ADD_DETAIL
    values.PERNR = detailInfo.FID
    let loadingList = [...loadings]
    loadingList[1] = true
    setLoadings(loadingList)
    updatePernrInfo({ data: JSON.stringify(values) }).then(res => {
      let loadingList = [...loadings]
      loadingList[1] = false
      setLoadings(loadingList)
      if (res.success) {
        message.success('操作成功')
        // const creatData = saveSucAssignment(values, personageDetailInfo)
        setPersonageDetailInfo(values || {})
        setPersonageStorgeInfo(JSON.parse(JSON.stringify(values || {})))
        setIsPersonageInfo(false)
      } else {
        setPersonageDetailInfo(JSON.parse(JSON.stringify(personageStorgeInfo || {})))
      }
    }).catch(() => {
      let loadingList = [...loadings]
      loadingList[1] = false
      setLoadings(loadingList)
    })
  }
  // 联系方式
  const contactWaySubmit = (values) => {
    values.FItemNumber = detailInfo.FItemNumber
    values.FID = detailInfo.FID
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    if (!/^1[3456789]\d{9}$/.test(values.FMobiePhone)) {
      message.error('手机号码格式不正确')
      return false
    }
    let loadingList = [...loadings]
    loadingList[0] = true
    setLoadings(loadingList)
    EditEmpInfo(values).then(res => {
      let loadingList = [...loadings]
      loadingList[0] = false
      setLoadings(loadingList)
      if (res.success) {
        message.success('操作成功')
        const creatData = saveSucAssignment(values, detailInfo)
        setDetailInfo(creatData)
        setIsContactInfo(false)
      }
    })
  }
  // 对象赋值
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
  // 保存对象中value是否有值
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
  const info = async () => {
    // 获取基本信息

    setTimeout(() => {
      getPernrInfo({ sapId: detailInfo.FID }).then(res => {
        if (res.success) {
          setPersonageStorgeInfo(JSON.parse(JSON.stringify(res.pernrInfo)))
          personageInfoForm.setFieldsValue(res.pernrInfo)
          setPersonageDetailInfo(res.pernrInfo)
          setPcodeList(res.pcodeList)
          setZzhukotypeList(res.zzhukotypeList)
          setFamstList(res.famstList)
          setFamsaList(res.famsaList)
        }
      })
      // 获取紧急联系人/家庭
      getFamilyInfo({ sapId: detailInfo.FID }).then(res => {
        if (res.success && res.exigence) {
          let tempData = { ...res.exigence, FGBDT: moment(res.exigence.FGBDT) }
          setExigenceStorgeInfo(JSON.parse(JSON.stringify(tempData)))
          setExigenceDetailInfo(tempData)
          emergencyContactForm.setFieldsValue(res.exigence)
        }
        if (res.success && res.familyInfo) {
          setTableList(res.familyInfo)
        }
      })
    }, 0)

    // 或者省级联
    listCityInfosByParentId({ parentId: 100000 }).then(res => {
      res.data.map(item => {
        item.isLeaf = false
        item.children = null
        return item
      })
      setAddressoptionsList(res.data)
    })
  }

  // 紧急联系人保存
  const emergencyContactSubmit = (values) => {
    values.PERNR = detailInfo.FID
    values.STRAS = exigenceDetailInfo.STRAS + values.STRAS_DETAIL_ADD
    values.FAMSA = '7'
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
      return false
    }
    if (!/^1[3456789]\d{9}$/.test(values.TELNR)) {
      message.error('手机号码格式不正确')
      return false
    }
    values.FGBDT = values.FGBDT.format('YYYY-MM-DD')
    let data = []
    data.push(values)
    let loadingList = [...loadings]
    loadingList[2] = true
    setLoadings(loadingList)
    editFamilyInfo({ data: JSON.stringify(data) }).then(res => {
      let loadingList = [...loadings]
      loadingList[2] = false
      setLoadings(loadingList)
      if (res.success) {
        const creatData = saveSucAssignment(values, exigenceDetailInfo)
        setExigenceDetailInfo(creatData)
        setExigenceStorgeInfo(JSON.parse(JSON.stringify(creatData)))
        message.success('操作成功')
        setIsEmergencyContact(false)
      } else {
        setExigenceDetailInfo(JSON.parse(JSON.stringify(exigenceStorgeInfo)))
      }
    })
  }
  // 点击修改按钮修改状态
  const updateFormData = (val) => {
    switch (val) {
      case 1:
        contactInfoForm.setFieldsValue(detailInfo)
        setIsContactInfo(true)
        break;
      case 2:
        personageInfoForm.setFieldsValue(personageDetailInfo)
        personageInfoForm.setFieldsValue({
          mailAddress: [],
          hukouLocation: [],
          homeAddress: [],
          ZZHUKOL_DETAIL: '',
          HOME_ADD_DETAIL: '',
          POST_ADD_DETAIL: '',
        });
        setIsPersonageInfo(true)
        break;
      case 3:
        let tempData = { ...exigenceDetailInfo, FGBDT: exigenceDetailInfo.FGBDT ? moment(exigenceDetailInfo.FGBDT) : null }
        // let tempData = { ...exigenceDetailInfo }
        setExigenceDetailInfo(tempData)
        emergencyContactForm.setFieldsValue(tempData)
        emergencyContactForm.setFieldsValue({
          contactAddress: [],
          STRAS_DETAIL_ADD: '',
        });
        setIsEmergencyContact(true)
        break;
      case 4:
        setFamilyNum(true)
        break;
    }
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
    let addressDeatil = selectedOptions[selectedOptions.length - 1].mergeName
    if (variables == 'exigenceDetailInfo') {
      let exigenceDetail = JSON.parse(JSON.stringify(exigenceDetailInfo || {}))
      exigenceDetail.STRAS = addressDeatil.replace(/,/g, '')
      setExigenceDetailInfo(exigenceDetail)
    } else {
      let personageDetail = JSON.parse(JSON.stringify(personageDetailInfo || {}))
      personageDetail.ZZHUKOL = val == 'hukouLocation' ? addressDeatil.replace(/,/g, '') : personageDetail.ZZHUKOL
      personageDetail.HOME_ADD = val == 'homeAddress' ? addressDeatil.replace(/,/g, '') : personageDetail.HOME_ADD
      personageDetail.POST_ADD = val == 'mailAddress' ? addressDeatil.replace(/,/g, '') : personageDetail.POST_ADD
      setPersonageDetailInfo(personageDetail)
      // console.log(address)
      // setAddress(personageDetail)
    }
  }

  let birthdayString = ''
  if (exigenceDetailInfo && exigenceDetailInfo.FGBDT) {
    if (typeof exigenceDetailInfo.FGBDT === 'string') {
      birthdayString = exigenceDetailInfo.FGBDT
    } else {
      birthdayString = exigenceDetailInfo.FGBDT.format('YYYY-MM-DD')
    }
  }
  // 个人信息取消
  const cancelPersonageSaveInfo = () => {
    personageInfoForm.resetFields();
    setIsPersonageInfo(!isPersonageInfo)
    personageInfoForm.setFieldsValue(personageStorgeInfo)
    setPersonageDetailInfo(JSON.parse(JSON.stringify(personageStorgeInfo)))
  }
  // 紧急联络人取消
  const cancelEmergency = () => {
    emergencyContactForm.resetFields();
    setIsEmergencyContact(!isEmergencyContact)
    emergencyContactForm.setFieldsValue(exigenceStorgeInfo)
    setExigenceDetailInfo(JSON.parse(JSON.stringify(exigenceStorgeInfo)))
  }

  return (
    <div className={styles.homePageForm}>
      {/* 基本信息 */}
      <div className={styles.basicInfo}>
        <div className={styles.infoTitle}>
          基本信息
        </div>
        <Form
          {...formItemLayout}
          labelAlign="left"
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={8}>
              <Form.Item label="姓名：" style={{ marginBottom: '17px' }} name="orgId">
                <span>{detailInfo && detailInfo.FItemName ? detailInfo.FItemName : '--'}</span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="性别" name="operatorId">
                <span>{detailInfo && detailInfo.FSex ? (detailInfo.FSex === 1 ? '男' : '女') : '--'}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工号：" name="operationPersonAccount">
                <span>{detailInfo && detailInfo.FID ? detailInfo.FID : '--'} </span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="账号" name="marketPersonAccount">
                <span>{detailInfo && detailInfo.FItemNumber ? detailInfo.FItemNumber : '--'}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="部门岗位：" name="operationPersonAccount">
                <span>{detailInfo && detailInfo.FPositionName ? detailInfo.FPositionName : '--'} </span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="司龄时间" name="marketPersonAccount">
                <span>{detailInfo && detailInfo.FEnterGroup ? detailInfo.FEnterGroup : '--'}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="职级" name="operationPersonAccount">
                <span>{detailInfo && detailInfo.FJobLevel ? detailInfo.FJobLevel : '--'}</span>
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
          labelAlign={isContactInfo ? 'right' : 'left'}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="办公电话" name="FTelePhone">
                {
                  isContactInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{detailInfo && detailInfo.FTelePhone ? detailInfo.FTelePhone : '--'}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="隶属公司" name="FCompanName">
                <span>{detailInfo && detailInfo.FCompanName ? detailInfo.FCompanName : '--'}</span>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="手机号码"
                name="FMobiePhone">
                {
                  isContactInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{detailInfo && detailInfo.FMobiePhone ? detailInfo.FMobiePhone : '--'}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="办公地址" name="FAdress">
                {
                  isContactInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{detailInfo && detailInfo.FAdress ? detailInfo.FAdress : '--'}</span>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            isContactInfo ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }} onClick={() => setIsContactInfo(!isContactInfo)}>
                取消
              </Button>
              <Button type="primary" loading={loadings[0]} htmlType="contactWaySubmit">
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
            !isPersonageInfo ? <p className={styles.isUpdate} style={{ cursor: 'pointer' }} onClick={() => updateFormData(2)}>修改</p> : <></>
          }
        </div>
        <Form
          {...formItemLayout}
          form={personageInfoForm}
          onFinish={personalInfoSubmit}
          labelAlign={isContactInfo ? 'right' : 'left'}
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
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.PCODEStr ? personageDetailInfo.PCODEStr : '--'} </span>
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
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.FAMSTStr ? personageDetailInfo.FAMSTStr : '--'} </span>
                }

              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="子女数目：" name="ANZKD">
                {
                  isPersonageInfo ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{personageDetailInfo && personageDetailInfo.ANZKD ? personageDetailInfo.ANZKD : '--'} </span>
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
                  </Select> : <span>{personageDetailInfo && personageDetailInfo.ZZHUKOTYPEStr ? personageDetailInfo.ZZHUKOTYPEStr : '--'} </span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="户口所在地：" name="hukouLocation">
                {
                  isPersonageInfo ?
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={addressoptionsList}
                      autoComplete="off"
                      loadData={loadData}
                      onChange={(val, data) => cascaderChange(val, data, 'personageDetailInfo', 'hukouLocation')}
                    /> : <span>{personageDetailInfo && personageDetailInfo.ZZHUKOL ? personageDetailInfo.ZZHUKOL : '--'} </span>
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
              <Form.Item label="家庭住址：" name="homeAddress">
                {
                  isPersonageInfo ?
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={addressoptionsList}
                      loadData={loadData}
                      autoComplete="off"
                      onChange={(val, data) => cascaderChange(val, data, 'personageDetailInfo', 'homeAddress')}
                    /> : <span>{personageDetailInfo && personageDetailInfo.HOME_ADD ? personageDetailInfo.HOME_ADD : '--'} </span>
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
              <Form.Item label="邮寄地址：" name="mailAddress">
                {
                  isPersonageInfo ?
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={addressoptionsList}
                      loadData={loadData}
                      autoComplete="off"
                      onChange={(val, data) => cascaderChange(val, data, 'personageDetailInfo', 'mailAddress')}
                    /> : <span>{personageDetailInfo && personageDetailInfo.POST_ADD ? personageDetailInfo.POST_ADD : '--'} </span>
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
              <Button style={{ marginRight: '26px' }} onClick={() => cancelPersonageSaveInfo()}>
                取消
                  </Button>
              <Button type="primary" loading={loadings[1]} htmlType="submit">
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
          initialValues={{
            FGBDT: exigenceDetailInfo.FGBDT
          }}
          labelAlign={isContactInfo ? 'right' : 'left'}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="紧急联络人：" name="FANAM">
                {
                  isEmergencyContact ?
                    <Input autoComplete="off" placeholder="请输入" />
                    // <Select style={{ width: '210px' }} allowClear placeholder='请选择'>
                    //   {famsaList &&
                    //     famsaList.map((item) => (
                    //       <Option key={item.FDateNum} value={item.FDateNum}>
                    //         {item.FDateName}
                    //       </Option>
                    //     ))}
                    // </Select>
                    : <span>{exigenceDetailInfo && exigenceDetailInfo.FANAM ? exigenceDetailInfo.FANAM : '--'}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="联络人电话：" name="TELNR">
                {
                  isEmergencyContact ? <Input autoComplete="off" placeholder="请输入" /> :
                    <span>{exigenceDetailInfo && exigenceDetailInfo.TELNR ? exigenceDetailInfo.TELNR : '--'}</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="出生日期：" name='FGBDT'>
                {
                  isEmergencyContact ?
                    <DatePicker
                      // defaultValue={moment(exigenceDetailInfo.FGBDT, 'YYYY-MM-DD')}
                      style={{ width: 210 }} />
                    :
                    <span>{birthdayString}</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}></Col>
            <Col span={9}>
              <Form.Item label="联络人地址：" name="contactAddress">
                {
                  isEmergencyContact ?
                    <Cascader
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={addressoptionsList}
                      style={{ width: 210 }}
                      onChange={(val, data) => cascaderChange(val, data, 'exigenceDetailInfo', 'STRAS')}
                      loadData={loadData}
                    />
                    : <span>{exigenceDetailInfo && exigenceDetailInfo.STRAS ? exigenceDetailInfo.STRAS : '--'}</span>
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
              <Button style={{ marginRight: '26px' }} onClick={() => cancelEmergency()}>
                取消
              </Button>
              <Button type="primary" loading={loadings[2]} htmlType="submit">
                保存
              </Button>
            </div> : <></>
          }
        </Form>
      </div>
      {
        detailInfo && detailInfo.FID ?
          <TableArea
            famsaList={famsaList} addressoptionsList={addressoptionsList}
            tableList={tableList}
            FID={detailInfo.FID}
          ></TableArea> : <></>
      }

    </div >
  )
}
export default FormData