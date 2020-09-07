import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Cascader, Select, Table, Tag, Space, message } from 'antd';
import styles from './styles.less'

const FormData = (props) => {

  const [form] = Form.useForm();
  const [contactInfo, setContactInfo] = useState(false)
  const [personageInfo, setPersonageInfo] = useState(false)
  const [emergencyContact, setEmergencyContact] = useState(false)
  const [familyNum, setFamilyNum] = useState(false)
  useEffect(() => {

  }, [])
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  };
  const personalInfoSubmit = (values) => {
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
    }
    setPersonageInfo(false)
  }
  // 联系方式
  const contactWaySubmit = (values) => {
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
    }
    setContactInfo(false)
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
  // 个人信息
  // const onFinish = (form) => {
  //   debugger
  //   console.log(form)
  // }
  // 紧急联系人
  const emergencyContactSubmit = (values) => {
    if (!isObjEmpty(values)) {
      message.error('您有信息未填写，请补充完整')
    }
    setEmergencyContact(false)
  }
  // 修改
  const updateFormData = (val) => {
    switch (val) {
      case 1:
        setContactInfo(true)
        break;
      case 2:
        setPersonageInfo(true)
        break;
      case 3:
        setEmergencyContact(true)
        break;
      case 4:
        setFamilyNum(true)
        break;
    }
  }
  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: text => <a>{text}</a>,
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  //   {
  //     title: 'Tags',
  //     key: 'tags',
  //     dataIndex: 'tags',
  //     render: tags => (
  //       <>
  //         {tags.map(tag => {
  //           let color = tag.length > 5 ? 'geekblue' : 'green';
  //           if (tag === 'loser') {
  //             color = 'volcano';
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
  // ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];
  return (
    <div className={styles.homePageForm}>
      {/* 基本信息 */}
      <div className={styles.basicInfo}>
        <div className={styles.infoTitle}>
          基本信息
        </div>
        <Form
          form={form}
          {...formItemLayout}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={8}>
              <Form.Item label="姓名：" style={{ marginBottom: '17px' }} name="orgId">
                <span>王佳佳</span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="性别" name="operatorId">
                <span>女</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工号：" name="operationPersonAccount">
                <span>127350 </span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="账号" name="marketPersonAccount">
                <span>jjwang</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="部门岗位：" name="operationPersonAccount">
                <span>产品分析师 </span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="司龄时间" name="marketPersonAccount">
                <span>2008.10.10</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="职级" name="operationPersonAccount">
                <span>T3 </span>
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
            !contactInfo ? <p className={styles.isUpdate} onClick={() => updateFormData(1)}>修改</p> : <></>
          }
        </div>
        <Form
          form={form}
          {...formItemLayout}
          onFinish={contactWaySubmit}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="办公电话" name="orgId">
                {
                  contactInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="隶属公司" name="operatorId">
                <span>浙江彩虹鱼科技有限公司</span>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="手机号码" name="operationPersonAccount">
                {
                  contactInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="办公地址" name="marketPersonAccount">
                {
                  contactInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            contactInfo ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
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
            !personageInfo ? <p className={styles.isUpdate} onClick={() => updateFormData(2)}>修改</p> : <></>
          }
        </div>
        <Form
          form={form}
          {...formItemLayout}
          onFinish={personalInfoSubmit}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="政治面貌：" name="orgId">
                {
                  personageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="婚姻状况：" name="operatorId">
                {
                  personageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="子女数目：" name="marketPersonAccount">
                {
                  personageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="户口类型：" name="operatorId">
                {
                  personageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="户口所在地：" name="operationPersonAccount">
                {
                  personageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="operationPersonAccount" {...tailLayout}>
                {
                  personageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="家庭住址：" name="marketPersonAccount">
                {
                  personageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="operationPersonAccount" {...tailLayout}>
                {
                  personageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="邮寄地址：" name="marketPersonAccount">
                {
                  personageInfo ? <Select style={{ width: '210px' }} allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="operationPersonAccount" {...tailLayout}>
                {
                  personageInfo ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            personageInfo ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }}>
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
            !emergencyContact ? <p className={styles.isUpdate} onClick={() => updateFormData(3)}>修改</p> : <></>
          }
        </div>
        <Form
          form={form}
          {...formItemLayout}
          onFinish={emergencyContactSubmit}
        >
          <Row gutter={24} style={{ textAlign: 'left' }}>
            <Col span={9}>
              <Form.Item label="紧急联系人：" name="orgId">
                {
                  emergencyContact ? <Select
                    showSearch
                    placeholder="请输入"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    allowClear
                    style={{ width: '210px' }}
                    showArrow={false}
                    notFoundContent={null}
                  >
                  </Select> : <span>111</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="联络人电话：" name="operatorId">
                {
                  emergencyContact ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="出生日期：" name="marketPersonAccount">
                {
                  emergencyContact ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15}></Col>
            <Col span={9}>
              <Form.Item label="联络人地址：" name="operationPersonAccount">
                {
                  emergencyContact ?
                    <Select style={{ width: '210px' }} allowClear>
                      <Option value="lucy">Lucy</Option>
                    </Select> : <span>11</span>
                }
              </Form.Item>
            </Col>
            <Col span={15} style={{ paddingLeft: '0' }}>
              <Form.Item name="operationPersonAccount" {...tailLayout}>
                {
                  emergencyContact ? <Input autoComplete="off" placeholder="请输入" /> : <span>11</span>
                }
              </Form.Item>
            </Col>
          </Row>
          {
            emergencyContact ? <div className={styles.operationBtn}>
              <Button style={{ marginRight: '26px' }}>
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
        {/* <div className={styles.infoTitle}>
          <p>家庭成员 请填写父母、配偶、子女、兄弟姐妹的具体信息</p>
          {
            familyNum ? <p className={styles.isUpdate} onClick={() => updateFormData(4)}>修改</p> : <></>
          }
        </div> */}
        {/* <Table className={styles.tableStyles} pagination={false} columns={columns} dataSource={data} /> */}
      </div>
      {/* <div className={styles.operationBtn} style={{ marginTop: '30px' }}>
        <Button style={{ marginRight: '26px' }}>
          取消
              </Button>
        <Button type="primary" htmlType="emergencyContactSubmit">
          保存
              </Button>
      </div> */}
    </div >
  )
}
export default FormData