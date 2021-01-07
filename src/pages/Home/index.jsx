import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Card, Carousel, Popover, Badge, Spin, Divider } from 'antd';
import toDoTasksImg from '@/assets/img/To-do-tasks.png';
import unreadMessages from '@/assets/img/Unread-messages.png';
import hallWords from '@/assets/img/Hall-words.png';
import HallPeople from '@/assets/img/HallPeople.png';
import waterHealth from '@/assets/img/waterHealth.png';
import play from '@/assets/img/play.png';
import MySchedule from '@/components/MySchedule';
import Birthday from './components/Birthday';
import CardComponent from '@/components/Card';
import styles from './style.less';
import { carousel } from '@/constants/mock';
import { withRouter } from 'umi';
import MyNav from '@/components/MyNav';
import TangGuoBi from '@/components/TangGuoBi';
import HallNews from './components/HallNews';
import LearningCenter from '@/components/LearningCenter';
import {
  GetIndexNotice,
  GetIndexNews,
  GetIndexInstitution,
  GetIndexCompetition,
  GetIndexPublicity,
} from '@/api/common';
import BBSCard from './components/BBSCard';

const Home = (props) => {
  const [noticeList, setNoticeList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [institutionList, setInstitutionList] = useState([]);
  const [competitionList, setCompetitionList] = useState([]);
  const [publicityList, setPublicityList] = useState([]);

  useEffect(() => {
    infoList();
  }, []);
  const infoList = () => {
    // 公告通知
    GetIndexNotice().then((response) => {
      if (response.success) {
        setNoticeList(response.data || []);
      }
    });
    // 获取新闻
    GetIndexNews().then((response) => {
      if (response.success) {
        setNewsList(response.data || []);
      }
    });
    // 获取制度流程
    GetIndexInstitution().then((response) => {
      if (response.success) {
        setInstitutionList(response.data || []);
      }
    });
    // 获取内部招聘
    GetIndexCompetition().then((response) => {
      if (response.success) {
        setCompetitionList(response.data || []);
      }
    });
    // 获取信息公示
    GetIndexPublicity().then((response) => {
      if (response.success) {
        setPublicityList(response.data || []);
      }
    });
  };

  return (
    <div>
      <HallNews />
      <div className={styles.otherContent}>
        <div className={styles.leftContent}>
          <MyNav />
          <LearningCenter />
          <TangGuoBi />
          <Birthday />
          <BBSCard />
        </div>
        <div className={styles.rightContent}>
          <MySchedule />
          <CardComponent
            dataList={noticeList}
            titlePaperwork="公告通知"
            moreUrl="http://10.213.3.39:9002/portal/AutoLogin.aspx?type=3"
          />
          <CardComponent
            dataList={newsList}
            titlePaperwork="新闻动态"
            moreUrl="http://10.213.3.39:9002/portal/AutoLogin.aspx?type=4"
          />
          <CardComponent
            dataList={institutionList}
            titlePaperwork="制度流程"
            moreUrl="http://10.213.3.39:9002/portal/AutoLogin.aspx?type=5"
          />
          <CardComponent
            dataList={competitionList}
            titlePaperwork="内部招聘"
            moreUrl="http://10.213.3.39:9002/portal/AutoLogin.aspx?type=7"
          />
          <CardComponent
            dataList={publicityList}
            titlePaperwork="信息公示"
            moreUrl="http://10.213.3.39:9002/portal/AutoLogin.aspx?type=6"
          />
        </div>
      </div>
      {/* <ModelAdvertising /> */}
    </div>
  );
};
export default withRouter(Home);
