import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Carousel } from 'antd';
import SwiperCore, { Autoplay } from 'swiper';

import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperComponent from '@/components/Swiper/Swiperv'

const birthdayArrList = [
  [{
    name: '陈慎建今天入职221111111111周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职2567721周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职2567721周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职2567721周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职22187666周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职22678651周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职22678651周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职22678651周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  ],
  [{
    name: '陈慎建今天入职1456周年',
    title: '开发四部信息部浙江彩虹鱼'
  }, {
    name: '陈慎建今天入职168周年',
    title: '开发四部信息部浙江彩虹鱼'
  },],
  [{
    name: '陈慎建今天入职167周年',
    title: '开发四部信息部浙江彩虹鱼'
  }, {
    name: '陈慎建今天入职1222周年',
    title: '开发四部信息部浙江彩虹鱼'
  },]
]
const birthdayArrList1 = [
  {
    name: '陈慎建今天入职1222周年',
    title: '开发四部信息部浙江彩虹鱼'
  },
  {
    name: '陈慎建今天入职1222周年',
    title: '开发四部信息部浙江彩虹鱼'
  }
]
SwiperCore.use([Autoplay]);
const Birthday = (props) => {
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
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
            birthdayArrList && birthdayArrList.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.birthdayNameList} key={index}>
                  {
                    item.map(val => (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className={styles.birthdayContent}>
                          <span></span>
                          <span className={styles.name}>{val.name}</span>
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
    </div>
  );
};
export default Birthday;
