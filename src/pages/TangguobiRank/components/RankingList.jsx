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

  const [pageSize, setPageSize] = useState(30);
  const [total, setTotal] = useState(50);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const queryRankData = (deptNumber, page, pageSize) => {
    setLoading(true);
    const date = new Date();
    const year = date.getFullYear().toString();
    const lastMonth = date.getMonth().toString();
    const curMonth = (date.getMonth() + 1).toString();

    // 年度榜单
    // 前十
    let p1 = new Promise(function (resolve, reject) {
      coinRankPaging({ deptNumber, year, page: 1, pageSize: 10 }).then(({ success, data }) => {
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
      coinRankPaging({ deptNumber, year, page, pageSize, offset: 10 }).then(({ success, data }) => {
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

    let p3 = new Promise(function (resolve, reject) {
      // 上月榜单
      coinRankPaging({ deptNumber, year, month: lastMonth, page: 1, pageSize: 10 }).then(
        ({ success, data }) => {
          if (success) {
            setLastMonthRank((pre) => {
              return { ...pre, top10Rank: data.records };
            });
            resolve();
          }
        },
      );
    });

    let p4 = new Promise(function (resolve, reject) {
      coinRankPaging({ deptNumber, year, month: lastMonth, page, pageSize, offset: 10 }).then(
        ({ success, data }) => {
          if (success) {
            setLastMonthRank((pre) => {
              return { ...pre, otherRank: data.records };
            });
            setTotal(data.total);
            setPageIndex(page);
            resolve();
          }
        },
      );
    });

    let p5 = new Promise(function (resolve, reject) {
      // 本月榜单
      coinRankPaging({ deptNumber, year, month: curMonth, page: 1, pageSize: 10 }).then(
        ({ success, data }) => {
          if (success) {
            setCurMonthRank((pre) => {
              return { ...pre, top10Rank: data.records };
            });
            resolve();
          }
        },
      );
    });

    let p6 = new Promise(function (resolve, reject) {
      coinRankPaging({ deptNumber, year, month: curMonth, page, pageSize, offset: 10 }).then(
        ({ success, data }) => {
          if (success) {
            setCurMonthRank((pre) => {
              return { ...pre, otherRank: data.records };
            });
            setTotal(data.total);
            setPageIndex(page);
            resolve();
          }
        },
      );
    });

    Promise.all([p1, p2, p3, p4, p5, p6]).then(() => {
      setLoading(false);
    });
  };

  // 页码变化回调
  const handlePageChange = (page) => {
    queryRankData(selectedOrg, page, 30);
  };

  // 标签变化回调
  const handleTabChange = (key) => {
    const date = new Date();
    const year = date.getFullYear();
    const lastMonth = date.getMonth();
    const curMonth = date.getMonth() + 1;
    switch (key) {
      case '1':
        // 前十
        coinRankPaging({ deptNumber: selectedOrg, year, page: 1, pageSize: 10 }).then(
          ({ success, data }) => {
            if (success) {
              setYearRank((pre) => {
                return { ...pre, top10Rank: data.records };
              });
            }
          },
        );
        // 其他
        coinRankPaging({ deptNumber: selectedOrg, year, page: 1, pageSize: 30, offset: 10 }).then(
          ({ success, data }) => {
            if (success) {
              setYearRank((pre) => {
                return { ...pre, otherRank: data.records };
              });
              setTotal(data.total);
              setPageIndex(1);
            }
          },
        );
        break;
      case '2':
        coinRankPaging({
          deptNumber: selectedOrg,
          year,
          month: lastMonth,
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
          deptNumber: selectedOrg,
          year,
          month: lastMonth,
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
          }
        });
        break;
      case '3':
        coinRankPaging({
          deptNumber: selectedOrg,
          year,
          month: curMonth,
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
          deptNumber: selectedOrg,
          year,
          month: curMonth,
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
          queryRankData(data.comCode, 1, 30);

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
              <RankingContent content={yearRank} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>上月榜单</span>} key="2">
              <RankingContent content={lastMonthRank} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>本月榜单</span>} key="3">
              <RankingContent content={currentMonthRank} />
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
