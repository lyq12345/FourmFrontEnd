import React, { useEffect, useState } from 'react';
import { Radio, Tabs, Checkbox } from 'antd';
import RankingContent from './RankingContent';
import styles from './style.less';

const data = [
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '1',
  },
  {
    label: '杭州白桦塑胶有限公司啊啊啊啊啊啊啊啊啊啊啊啊啊',
    value: '2',
  },
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '3',
  },
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '4',
  },
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '5',
  },
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '6',
  },
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '7',
  },
  {
    label: '浙江彩虹鱼科技有限公司',
    value: '8',
  },
];
const RankingList = () => {
  const [selectedComp, setSelectedComp] = useState('1');
  const [companyFontColor, setFontColor] = useState('#999999');

  const handleChange = (e) => {
    setSelectedComp(e.target.value);
    setFontColor('#ffffff');
  };
  return (
    <div>
      <div>
        <Radio.Group
          buttonStyle="solid"
          optionType="button"
          value={selectedComp}
          onChange={handleChange}
          className={styles.companyRadioGroup}
        >
          {data.map((item) => (
            <Radio.Button className={styles.companyRadio} value={item.value}>
              <span
                style={{
                  fontSize: '14px',
                  fontFamily: 'PingFangSC-Regular, PingFang SC',
                  fontWeight: 400,
                  color: { companyFontColor },
                  lineHeight: '14px',
                }}
              >
                {item.label}
              </span>
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          tabBarExtraContent={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox>
                <span
                  style={{
                    fontSize: '14px',
                    fontFamily: 'PingFangSC-Regular, PingFang SC',
                    fontWeight: 400,
                    color: '#666666',
                    lineHeight: '20px',
                  }}
                >
                  仅展示”我“所在部门排名
                </span>
              </Checkbox>
            </div>
          }
        >
          <Tabs.TabPane tab={<span>年度榜单</span>} key="1">
            <RankingContent />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span>上月榜单</span>} key="2"></Tabs.TabPane>
          <Tabs.TabPane tab={<span>本月榜单</span>} key="3"></Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default RankingList;
