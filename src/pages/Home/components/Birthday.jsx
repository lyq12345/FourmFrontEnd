import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Carousel } from 'antd';
import SwiperCore, { Autoplay } from 'swiper';
import { GetBirthdayIndex } from '@/api/birthdayWish'
import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperComponent from '@/components/Swiper/Swiperv'
import WishDialog from '@/components/WishDialog'

SwiperCore.use([Autoplay]);
const Birthday = (props) => {
  const [swiper, setSwiper] = useState(null);
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    GetBirthdayIndex().then(res => {
      if (res.success) {
        setDataList(res.data || [])
      }
    })
  }, [])
  return (
    <div className={styles.birthday}>
      <div className={styles.birthdayAnniversary}>
        <span>生日周年庆</span>
        <span onClick={() => window.open('BirthdayWish')}>更多</span>
      </div>
      <div>
        {/* autoplay */}

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          direction='vertical'
          onSwiper={(swiper) => setSwiper(swiper)}
          autoplay={{ delay: 5000 }}
          loop
        >
          {
            dataList && dataList.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.birthdayNameList} key={index}>
                  {
                    item.map(val => (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className={styles.birthdayContent}>
                          <span></span>
                          <span className={styles.name}>{val.userName} {val.deptName}</span>
                        </p>
                        <p className={styles.sendBlessings}><a href=''>送祝福</a></p>
                      </div>
                    ))
                  }
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <WishDialog />
    </div>
  );
};
export default Birthday;
