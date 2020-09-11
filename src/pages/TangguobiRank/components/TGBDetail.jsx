import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Avatar } from 'antd';
import myAvatar from '@/assets/img/avatar.jpg';
import styles from './style.less';
import { coinDetailPaging, getPersonInfo, getMyRank } from '@/api/tangguobi';

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
  const [giveData, setGiveData] = useState([]);
  const [personInfo, setPersonInfo] = useState({});
  const [coins, setCoins] = useState(0);
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    if (props.personCode !== null) {
      coinDetailPaging({ personCode: props.personCode, year, type: 0 }).then(
        ({ success, data }) => {
          if (success) {
            const records = data.records;
            const arr = [];
            records.forEach((item) => {
              const info = {
                key: item.id,
                fromPerInfo: {
                  personNameFrom: item.personNameFrom,
                  comNameFrom: item.comNameFrom,
                  deptNameFrom: item.deptNameFrom,
                },
                coin: item.coin,
                giveDate: item.giveDateStr,
                valuesType: item.valuesType,
                reason: item.reason,
              };
              arr.push(info);
            });
            console.log(arr);
            setGiveData(arr);
          }
        },
      );
      getMyRank({ personCode: props.personCode }).then(({ success, data }) => {
        if (success) {
          setPersonInfo(data);
        }
      });
    }
  }, [props.personCode]);
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
        <Avatar icon={<img src={personInfo.avatar} />} size={80} />
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
            {personInfo.personName}
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
            {personInfo.deptName}
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
            {personInfo.coinAll}
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
            {`截止今天${personInfo.year}年度累计获得堂果币`}
          </p>
        </div>
      </div>
      <Table
        className={styles.detailTable}
        pagination={false}
        columns={columns}
        dataSource={giveData}
        size="middle"
        scroll={{ y: 340 }}
      />
    </Modal>
  );
};

export default TGBDetail;
