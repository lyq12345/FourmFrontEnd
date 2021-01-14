import React, { useEffect, useState, useContext } from 'react';
import Bullets from '@/components/TangGuoBi/components/BulletBase';
import banner from '@/assets/img/banner.png';
import RankingList from './components/RankingList';
import TGBDetail from './components/TGBDetail';
import { modalContext } from './components/context';
import { isNull } from 'lodash';

const TangguobiRank = (porps) => {
  const bulSetting = {
    display: 'absolute',
    top: '25%',
    height: '180px',
    overflow: 'hidden',
  };
  const bkgSetting = {
    backgroundImage: `url(${banner})`,
    height: '250px',
  };

  const [visible, setVisible] = useState(false);
  const [personCode, setPersonCode] = useState(null);
  const [detailData, setDetailData] = useState([]);
  const [rankYear, setYear] = useState(null);
  const [rankMonth, setMonth] = useState(null);

  const handleClick = () => {
    queryDetail();
  };
  const queryDetail = () => {
    console.log('query detail!');
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };
  return (
    <div>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '6px' }}>
        {/*弹幕 */}
        <div>
          <Bullets bgSetting={bkgSetting} bulSetting={bulSetting} type={0} />
        </div>

        {/*公司列表 */}
        <div>
          <h2>堂果币排行榜</h2>
          <modalContext.Provider value={{ setVisible, setPersonCode, setDetailData, setYear, setMonth }}>
            <RankingList handleClick={handleClick} />
          </modalContext.Provider>
        </div>

        {/*榜单 */}
      </div>
      <TGBDetail
        visible={visible}
        handleCancel={handleCancel}
        personCode={personCode}
        detailData={detailData}
        rankYear={rankYear}
        rankMonth={rankMonth}
      />
    </div>
  );
};

export default TangguobiRank;
