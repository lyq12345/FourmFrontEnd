import React from 'react';
import { Card, Carousel } from 'antd';
import toDoTasks from '@/assets/img/To-do-tasks.png';
import unreadMessages from '@/assets/img/Unread-messages.png';
import hallWords from '@/assets/img/Hall-words.png';
import CardComponent from '@/components/Card';
import styles from './style.less';

const Home = () => {
  const contentStyle = {
    height: '273px',
    color: '#fff',
    lineHeight: '273px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div>
      <div className={styles.infoTitle}>
        <div className={styles.titleText}>
          <span className={styles.name}>
            亲爱的王佳佳，这是你在堂里的第<i className={styles.today}>2020</i>天
          </span>
          <span>|</span>
          <img src={hallWords} alt="" />
          <span className={styles.HallWords}>
            能正确的提出问题就是迈出创新第一步能正确的提出问题就是迈出创最多出创最多三九字
          </span>
        </div>
        <div className={styles.task}>
          <img src={unreadMessages} alt="" />
          <span>未读消息</span>
          <span className={`${styles.messageTost} ${styles.message}`}>11</span>
          <img src={toDoTasks} alt="" />
          <span>待办任务</span>
          <span className={styles.messageTost}>99</span>
        </div>
      </div>
      {/* 堂里新鲜事 */}
      <div className={styles.somethingHall}>
        <div className={styles.leftContent}>
          <p className={styles.somethingHallTitle}>堂里新鲜事</p>
          <div className={styles.leftCarousel}>
            <div className={styles.Carousel}>
              <Carousel autoplay dots={false}>
                <div>
                  <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>4</h3>
                </div>
              </Carousel>
            </div>
            <div className={styles.rightCarouselContent}>
              <div className={styles.rightcontentText}>
                <p>【每周一的堂里人】</p>
                <p>利他，不仅仅是顺境下的按部就班，更是…</p>
              </div>
              <div className={styles.rightcontentText}>
                <p>【每周一的堂里人】</p>
                <p>利他，不仅仅是顺境下的按部就班，更是…</p>
              </div>
              <div className={styles.rightcontentText}>
                <p>【每周一的堂里人】</p>
                <p>利他，不仅仅是顺境下的按部就班，更是…</p>
              </div>
              <div className={styles.rightcontentText}>
                <p>【每周一的堂里人】</p>
                <p>利他，不仅仅是顺境下的按部就班，更是…</p>
              </div>
              <div className={styles.lookMore}>查看更多</div>
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <p>111</p>
        </div>
      </div>
      {/*  */}
      <div className={styles.otherContent}>
        <div className={styles.leftContent} />
        <div className={styles.rightContent}>
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </div>
    </div>
  );
};
export default Home;
