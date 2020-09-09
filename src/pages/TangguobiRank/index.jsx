import React, { useEffect, useState, useContext } from 'react';
import Bullets from '@/components/TangGuoBi/components/Bullets';
import banner from '@/assets/img/banner.png';
import RankingList from './components/RankingList';
import TGBDetail from './components/TGBDetail';
const TangguobiRank = () => {
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
          <Bullets bgSetting={bkgSetting} bulSetting={bulSetting} />
        </div>

        {/*公司列表 */}
        <div>
          <h2>堂果币排行榜</h2>
          <RankingList handleClick={handleClick} />
        </div>

        {/*榜单 */}
      </div>
      <TGBDetail visible={visible} handleCancel={handleCancel} />
    </div>
  );
};

export default TangguobiRank;
