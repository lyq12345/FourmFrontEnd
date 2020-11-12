/**
已经实现的功能：
1. 鼠标悬浮自动暂停
2. 暂停样式（图片）
3. 播放完成重新 load
 */

import * as React from "react";

// swiper
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { carouselList } from '@/constants/mock'
// import "swiper/swiper.scss";

// import "./styles.css";
import "./styles.less";

import { useHover } from "ahooks";

SwiperCore.use([Autoplay]);

export type ItemModel = {
  url: string;
  posterUrl: string;
  type: "video" | "image";
};

export default (props) => {
  let { carouselList } = props
  // const [data, setData] = React.useState<ItemModel[]>([]);
  React.useEffect(() => {
    // fetch("/mock/swiper.data.json")
    //   .then((res) => res.json())
    //   .then((res) => setData(res.data));
  }, []);

  const [swiper, setSwiper] = React.useState(null);

  // 自动停止轮播
  const ref = React.useRef();
  const isHovering = useHover(ref);
  const [isPlaying, setIsPlaying] = React.useState(false);
  React.useEffect(() => {
    if (isHovering || isPlaying) {
      swiper?.autoplay?.stop();
    } else {
      swiper?.autoplay?.start();
    }
  }, [isHovering, swiper, isPlaying]);

  // 播放完成后自动回显 poster
  const handleEnded = React.useCallback((e) => {
    e.target.load();
    setIsPlaying(false);
  }, []);
  // 播放控制
  const handleClick = React.useCallback((e) => {
    const video = e.target;
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }, []);
  // 播放控制 - 样式
  const handleCanPlay = React.useCallback((e) => {
    e.target.parentElement.dataset.state = "pause";
  }, []);
  const handlePause = React.useCallback((e) => {
    e.target.parentElement.dataset.state = "pause";
    setIsPlaying(false);
  }, []);
  const handlePlaying = React.useCallback((e) => {
    e.target.controls = true;
    e.target.parentElement.dataset.state = "";
    setIsPlaying(true);
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      onSwiper={(swiper) => setSwiper(swiper)}
      autoplay={{ delay: 2000 }}
      loop
      ref={ref}
    >
      {carouselList.map((v, i) => {
        return (
          <SwiperSlide key={i}>
            <div className="container">
              {v.href.videoMP4 ? (
                <video
                  src={v.href.videoMP4}
                  poster={v.href.src}
                  onEnded={handleEnded}
                  onClick={handleClick}
                  onCanPlay={handleCanPlay}
                  onPause={handlePause}
                  onPlaying={handlePlaying}
                  preload="metadata"
                />
              ) : (
                  <img style={{ width: '487px', height: '278px' }} src={v.href.src} alt="pic" />
                )}
            </div>
            {`第${i}个`}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
