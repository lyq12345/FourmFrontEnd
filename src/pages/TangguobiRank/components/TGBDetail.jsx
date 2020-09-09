import React from 'react';
import { Modal, Button, Table, Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import styles from './style.less';

const data = [
  {
    key: '1',
    personNameTo: 'yyy',
    deptNameTo: '财务部',
    comNameTo: '养生堂',
    reason:
      '萨斯发链接卡拉胶克鲁赛德荆防颗粒克拉斯就案件受到了疯狂拉科技是考虑对方加拉手机打开了房间阿萨德骄傲凉快圣诞节快乐风景阿萨德拉时间段里看风景',
    coin: '10000',
    valuesType: '利他',
    giveDate: '2020.08.31',
    headImg: '@/assets/img/avatar.jpg',
    fromPerInfo: {
      personNameFrom: '你爸爸',
      deptNameFrom: '信息技术部',
      comNameFrom: '彩虹鱼',
    },
  },
  {
    key: '2',
    personNameTo: 'yyy',
    deptNameTo: '财务部',
    comNameTo: '养生堂',
    personNameFrom: '你爷爷',
    reason: '太帅了',
    coin: '10000',
    valuesType: '利他',
    giveDate: '2020.08.31',
    deptNameFrom: '信息技术部',
    comNameFrom: '彩虹鱼',
    headImg: '@/assets/img/avatar.jpg',
    fromPerInfo: {
      personNameFrom: '你爸爸',
      deptNameFrom: '信息技术部',
      comNameFrom: '彩虹鱼',
    },
  },
  {
    key: '3',
    personNameTo: 'yyy',
    deptNameTo: '财务部',
    comNameTo: '养生堂',
    personNameFrom: '你奶奶',
    reason: '太帅了',
    coin: '10000',
    valuesType: '利他',
    giveDate: '2020.08.31',
    deptNameFrom: '信息技术部',
    comNameFrom: '彩虹鱼',
    headImg: '@/assets/img/avatar.jpg',
    fromPerInfo: {
      personNameFrom: '你爸爸',
      deptNameFrom: '信息技术部',
      comNameFrom: '彩虹鱼',
    },
  },
  {
    key: '4',
    personNameTo: 'yyy',
    deptNameTo: '财务部',
    comNameTo: '养生堂',
    personNameFrom: '你奶奶',
    reason: '太帅了',
    coin: '10000',
    valuesType: '利他',
    giveDate: '2020.08.31',
    deptNameFrom: '信息技术部',
    comNameFrom: '彩虹鱼',
    headImg: '@/assets/img/avatar.jpg',
    fromPerInfo: {
      personNameFrom: '你爸爸',
      deptNameFrom: '信息技术部',
      comNameFrom: '彩虹鱼',
    },
  },
  {
    key: '5',
    personNameTo: 'yyy',
    deptNameTo: '财务部',
    comNameTo: '养生堂',
    personNameFrom: '你奶奶',
    reason: '太帅了',
    coin: '10000',
    valuesType: '利他',
    giveDate: '2020.08.31',
    deptNameFrom: '信息技术部',
    comNameFrom: '彩虹鱼',
    headImg: '@/assets/img/avatar.jpg',
    fromPerInfo: {
      personNameFrom: '你爸爸',
      deptNameFrom: '信息技术部',
      comNameFrom: '彩虹鱼',
    },
  },
];

const columns = [
  {
    title: '赠送人',
    dataIndex: 'fromPerInfo',
    width: 200,
    render: (text) => (
      <div>
        <p
          style={{
            fontSize: '14px',
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            fontWeight: 400,
            color: '#333333',
          }}
        >
          {text.personNameFrom}
        </p>
        <p
          style={{
            fontSize: '12px',
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            fontWeight: 400,
            color: '#333333',
          }}
        >
          {text.comNameFrom}
        </p>
        <p
          style={{
            fontSize: '12px',
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            fontWeight: 400,
            color: '#333333',
          }}
        >
          {text.deptNameFrom}
        </p>
      </div>
    ),
  },
  {
    title: '赠送金额',
    width: 100,
    dataIndex: 'coin',
    render: (text) => <p className={styles.detalTabletext}>{text}</p>,
  },
  {
    title: '赠送时间',
    width: 120,
    dataIndex: 'giveDate',
    render: (text) => <p className={styles.detalTabletext}>{text}</p>,
  },
  {
    title: '价值观',
    width: 120,
    dataIndex: 'valuesType',
    render: (text) => <p className={styles.detalTabletext}>{text}</p>,
  },
  {
    title: '具体原因',
    dataIndex: 'reason',
    render: (text) => <p className={styles.detalTabletext}>{text}</p>,
  },
];
const TGBDetail = (props) => {
  return (
    <Modal
      className={styles.detailModal}
      title="堂果币明细"
      width={1100}
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" onClick={props.handleCancel}>
            知道了
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <Avatar icon={<img src={myAvatar} />} size={80} />
        <div style={{ margin: '0 30px 0px 10px' }}>
          <p
            style={{
              fontSize: '14px',
              fontFamily: 'PingFangSC-Semibold, PingFang SC',
              fontWeight: 400,
              color: '#333333',
              lineHeight: '20px',
            }}
          >
            赵倩
          </p>
          <p
            style={{
              fontSize: '12px',
              fontFamily: 'PingFangSC-Semibold, PingFang SC',
              fontWeight: 400,
              color: '#666666',
              lineHeight: '17px',
            }}
          >
            开发四部
          </p>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#D8D8D8' }}></div>
        <div style={{ margin: '0 10px' }}>
          <p
            style={{
              fontSize: '24px',
              fontFamily: 'PingFangSC-Semibold, PingFang SC',
              fontWeight: 600,
              color: '#EB0029',
              lineHeight: '22px',
            }}
          >
            2300
          </p>
          <p
            style={{
              fontSize: '12px',
              fontFamily: 'PingFangSC-Semibold, PingFang SC',
              fontWeight: 400,
              color: 'rgba(0, 0, 0, 0.5)',
              lineHeight: '22px',
            }}
          >
            截止今天2020年度累计获得堂果币
          </p>
        </div>
      </div>
      <Table
        className={styles.detailTable}
        pagination={false}
        columns={columns}
        dataSource={data}
        size="middle"
        scroll={{ y: 340 }}
      />
    </Modal>
  );
};

export default TGBDetail;
