import React, { useEffect, useState } from 'react';
import { Radio, Tabs, Checkbox, Pagination, Spin } from 'antd';
import RankingContent from './RankingContent';
import styles from './style.less';
import { getOrgList, getPersonInfo, coinRankPaging } from '@/api/tangguobi';

const RankingList = () => {
  const [selectedOrg, setSelectedOrg] = useState('1');
  const [companyFontColor, setFontColor] = useState('#999999');
  const [orgList, setOrgList] = useState([]);
  const [personInfo, setPersonInfo] = useState({});
  const [isMyDept, setIsMyDept] = useState(false);
  const [yearRank, setYearRank] = useState({ top10Rank: [], otherRank: [] });
  const [lastMonthRank, setLastMonthRank] = useState({ top10Rank: [], otherRank: [] });
  const [currentMonthRank, setCurMonthRank] = useState({ top10Rank: [], otherRank: [] });
  const [isHead, setIsHead] = useState(false);

  const [pageSize, setPageSize] = useState(30);
  const [total, setTotal] = useState(50);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const curYearDate = new Date(); // 目前日期
  const lastMonthDate = new Date(); // 上月日期
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  const renderTabBar = (props, DefaultTabBar) => {
    ({ style }) => {
      <DefaultTabBar {...props} style={{ ...style }} />;
    };
  };

  const handleChange = (e) => {
    setSelectedOrg(() => {
      queryRankData(e.target.value, 1, 30);
      return e.target.value;
    });
  };

  const queryRankDataOnce = (deptNumber, page, pageSize) => {
    setLoading(true);
    let params = {};
    if (deptNumber === '50001575') {
      params = {
        deptNumber,
        year: curYearDate.getFullYear(),
        page: 1,
        pageSize: 40,
        deptType: 1,
      };
    } else {
      params = {
        deptNumber,
        year: curYearDate.getFullYear(),
        page: 1,
        pageSize: 40,
      };
    }

    coinRankPaging(params).then(({ success, data }) => {
      if (success) {
        setYearRank({ top10Rank: data.records.slice(0, 10), otherRank: data.records.slice(10) });
        setTotal(data.total);
        setPageIndex(1);
        setLoading(false);
      }
    });
  };
  const queryRankData = (deptNumber, page, pageSize) => {
    setLoading(true);
    let params = {};
    if (deptNumber === '50001575') {
      params = {
        deptType: 1,
      };
    } else {
      params = {};
    }

    // 年度榜单
    // 前十
    let p1 = new Promise(function (resolve, reject) {
      coinRankPaging({
        ...params,
        deptNumber,
        year: curYearDate.getFullYear(),
        page: 1,
        pageSize: 10,
      }).then(({ success, data }) => {
        if (success) {
          setYearRank((pre) => {
            return { ...pre, top10Rank: data.records };
          });
          resolve();
        }
      });
    });

    // 其他
    let p2 = new Promise(function (resolve, reject) {
      coinRankPaging({
        ...params,
        deptNumber,
        year: curYearDate.getFullYear(),
        page,
        pageSize,
        offset: 10,
      }).then(({ success, data }) => {
        if (success) {
          setYearRank((pre) => {
            return { ...pre, otherRank: data.records };
          });
          setTotal(data.total);
          setPageIndex(page);
          resolve();
        }
      });
    });

    Promise.all([p1, p2]).then(() => {
      setLoading(false);
    });
  };

  // 页码变化回调
  const handlePageChange = (page) => {
    queryRankData(selectedOrg, page, 30);
  };

  // 标签变化回调
  const handleTabChange = (key) => {
    setLoading(true);
    let params = {};
    if (selectedOrg === '50001575') {
      params = {
        deptType: 1,
      };
    } else {
      params = {};
    }
    switch (key) {
      case '1': // 年度榜单
        // 前十
        coinRankPaging({
          ...params,
          deptNumber: selectedOrg,
          year: curYearDate.getFullYear(),
          page: 1,
          pageSize: 10,
        }).then(({ success, data }) => {
          if (success) {
            setYearRank((pre) => {
              return { ...pre, top10Rank: data.records };
            });
          }
        });
        // 其他
        coinRankPaging({
          ...params,
          deptNumber: selectedOrg,
          year: curYearDate.getFullYear(),
          page: 1,
          pageSize: 30,
          offset: 10,
        }).then(({ success, data }) => {
          if (success) {
            setYearRank((pre) => {
              return { ...pre, otherRank: data.records };
            });
            setTotal(data.total);
            setPageIndex(1);
            setLoading(false);
          }
        });
        break;
      case '2': // 上月榜单
        coinRankPaging({
          ...params,
          deptNumber: selectedOrg,
          year: lastMonthDate.getFullYear(),
          month: lastMonthDate.getMonth() + 1,
          page: 1,
          pageSize: 10,
        }).then(({ success, data }) => {
          if (success) {
            setLastMonthRank((pre) => {
              return { ...pre, top10Rank: data.records };
            });
          }
        });
        coinRankPaging({
          ...params,
          deptNumber: selectedOrg,
          year: lastMonthDate.getFullYear(),
          month: lastMonthDate.getMonth() + 1,
          page: 1,
          pageSize: 30,
          offset: 10,
        }).then(({ success, data }) => {
          if (success) {
            setLastMonthRank((pre) => {
              return { ...pre, otherRank: data.records };
            });
            setTotal(data.total);
            setPageIndex(1);
            setLoading(false);
          }
        });
        break;
      case '3': // 本月榜单
        coinRankPaging({
          ...params,
          deptNumber: selectedOrg,
          year: curYearDate.getFullYear(),
          month: curYearDate.getMonth() + 1,
          page: 1,
          pageSize: 10,
        }).then(({ success, data }) => {
          if (success) {
            setCurMonthRank((pre) => {
              return { ...pre, top10Rank: data.records };
            });
          }
        });
        coinRankPaging({
          ...params,
          deptNumber: selectedOrg,
          year: curYearDate.getFullYear(),
          month: curYearDate.getMonth() + 1,
          page: 1,
          pageSize: 30,
          offset: 10,
        }).then(({ success, data }) => {
          if (success) {
            setCurMonthRank((pre) => {
              return { ...pre, otherRank: data.records };
            });
            setTotal(data.total);
            setPageIndex(1);
            setLoading(false);
          }
        });
        break;
      default:
        return;
    }
  };

  // 仅显示部门选择回调
  const handleCheck = (e) => {
    if (e.target.checked) {
      queryRankData(personInfo.orgCode, 1, 30);
    } else {
      queryRankData(personInfo.comCode, 1, 30);
    }
  };

  useEffect(() => {
    const { personCode } = JSON.parse(localStorage.getItem('userInfo'));
    getPersonInfo({ personCode }).then(({ success, data }) => {
      if (success) {
        setPersonInfo(data);
        setSelectedOrg(() => {
          queryRankDataOnce(data.comCode, 1, 40);

          return data.comCode;
        });
      }
    });
    getOrgList().then(({ success, data }) => {
      if (success) {
        setOrgList(data);
      }
    });
  }, []);
  return (
    <div>
      <div>
        <Radio.Group
          buttonStyle="solid"
          optionType="button"
          value={selectedOrg}
          onChange={handleChange}
          className={styles.companyRadioGroup}
        >
          {orgList.map((item) => (
            <Radio.Button className={styles.companyRadio} value={item.deptNumber}>
              {item.deptName}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div className={styles.rankTabContainer}>
        <Spin spinning={loading}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            onChange={handleTabChange}
            tabBarGutter={0}
            tabBarExtraContent={
              selectedOrg === personInfo.comCode ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox onChange={handleCheck}>
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
              ) : null
            }
          >
            <Tabs.TabPane tab={<span>年度榜单</span>} key="1">
              <RankingContent
                content={yearRank}
                year={curYearDate.getFullYear()}
                month={curYearDate.getMonth() + 1}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>上月榜单</span>} key="2">
              <RankingContent
                content={lastMonthRank}
                year={lastMonthDate.getFullYear()}
                month={lastMonthDate.getMonth() + 1}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>本月榜单</span>} key="3">
              <RankingContent
                content={currentMonthRank}
                year={curYearDate.getFullYear()}
                month={curYearDate.getMonth() + 1}
              />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Pagination
          current={pageIndex}
          total={total}
          pageSize={30}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RankingList;
