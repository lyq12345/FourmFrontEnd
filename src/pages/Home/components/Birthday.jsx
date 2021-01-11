import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.less';
import { Carousel } from 'antd';
import SwiperCore, { Autoplay } from 'swiper';
import { GetBirthdayIndex } from '@/api/birthdayWish';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperComponent from '@/components/Swiper/Swiperv';
import WishDialog from '@/components/WishDialog';

SwiperCore.use([Autoplay]);
const Birthday = (props) => {
  const [swiper, setSwiper] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isDialog, setIsDialog] = useState(false);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  useEffect(() => {
    GetBirthdayIndex().then((res) => {
      if (res.success) {
        setDataList(res.data || []);
      }
    });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [size.width || size.height]);
  useEffect(() => {
    swiper ? (swiper.params.width = document.documentElement.clientWidth) : null;
    swiper ? (swiper.params.height = document.documentElement.clientHeight) : null;
  }, [swiper]);
  
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
    swiper ? (swiper.params.width = document.documentElement.clientWidth) : null;
    swiper ? (swiper.params.height = document.documentElement.clientHeight) : null;
  }, [swiper]);
  const sendWishClick = (val) => {
    setUserInfo(val);
    setIsDialog(true);
  };
  const closeDialog = () => {
    setIsDialog(false);
  };
  const changeSwiper = (swiper) => {
    setSwiper(swiper);
    // resize: function() {
    //   this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
    // }
    // console.log()
  };
  return (
    <div className={styles.birthday}>
      <div className={styles.birthdayAnniversary}>
        <span>生日祝福</span>
        <span onClick={() => window.open('/yst-iwork-alpha/birthday-wish')}>更多</span>
      </div>
      <div>
        {/* autoplay */}

        {dataList && dataList.length ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            direction="vertical"
            onSwiper={(swiper) => changeSwiper(swiper)}
            autoplay={{ delay: 3000 }}
            loop
            speed={500}
            updateOnWindowResize={true}
            observer={true}
          >
            {dataList &&
              dataList.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.birthdayNameList} key={index}>
                    {item.map((val, _index) => (
                      <div
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                        key={_index}
                      >
                        <p className={styles.birthdayContent}>
                          <img src={val.avater} alt="" />
                          <span className={styles.name}>
                            {val.userName} {val.deptName}
                          </span>
                        </p>
                        <p className={styles.sendBlessings} onClick={() => sendWishClick(val)}>
                          送祝福
                        </p>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <></>
        )}
      </div>
      <WishDialog userInfo={userInfo} isDialog={isDialog} closeDialog={closeDialog} />
    </div>
  );
};
export default Birthday;
