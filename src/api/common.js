import request from '@/utils/request';

// 获取首页考勤
export const GetAtten = async (data) =>
  request('/IWork/GetAtten', {
    method: 'get',
    data,
  });
// 获取入职时间
export const GetUserTip = async (data) =>
  request('/IWork/GetUserTip', {
    method: 'get',
    params: data,
  });
// 获取堂里话
export const GetPortalTip = async (data) =>
  request('/IWork/GetPortalTip', {
    method: 'get',
    data,
  });
// 获取首页堂里新鲜事
export const GetAffairIndex = async (data) =>
  request('/IWork/GetAffairIndex', {
    method: 'get',
    data,
  });
// 获取首页堂里新鲜事列表
export const GetAffair = async (data) =>
  request('/IWork/GetAffair', {
    method: 'get',
    params: data,
  });
// 获取首页堂里新鲜事正文
export const GetAffairView = async (data) =>
  request('/IWork/GetAffairView', {
    method: 'get',
    params: data,
  });
// 堂里事点赞
export const SetAffairLove = async (data) =>
  request('/IWork/SetAffairLove', {
    method: 'get',
    params: data,
  });
// 获取首页堂里人
export const GetAffairPersonIndex = async (data) =>
  request('/IWork/GetAffairPersonIndex', {
    method: 'get',
    params: data,
  });
// 获取首页堂里人列表
export const GetAffairPerson = async (data) =>
  request('/IWork/GetAffairPerson', {
    method: 'get',
    params: data,
  });
// 获取首页堂里人正文
export const GetAffairPersonView = async (data) =>
  request('/IWork/GetAffairPersonView', {
    method: 'get',
    params: data,
  });
// 获取首页通知公告
export const GetIndexNotice = async (data) =>
  request('/IWork/GetIndexNotice', {
    method: 'get',
    data,
  });
// 获取首页新闻
export const GetIndexNews = async (data) =>
  request('/IWork/GetIndexNews', {
    method: 'get',
    params: data,
  });
// 获取首页制度文档
export const GetIndexInstitution = async (data) =>
  request('/IWork/GetIndexInstitution', {
    method: 'get',
    data,
  });
// 获取首页内部招聘
export const GetIndexCompetition = async (data) =>
  request('/IWork/GetIndexCompetition', {
    method: 'get',
    data,
  });
// 获取首页内部公示
export const GetIndexPublicity = async (data) =>
  request('/IWork/GetIndexPublicity', {
    method: 'get',
    data,
  });
// 获取待办任务
export const GetTask = async (data) =>
  request('/IWork/GetTask', {
    method: 'get',
    data,
  });
// 获取未读消息
export const GetMessage = async (data) =>
  request('/IWork/GetMessage', {
    method: 'get',
    data,
  });
// 获取我的日历
export const GetCalendar = async (data) =>
  request('/Iwork/GetCalendar', {
    method: 'get',
    params: data,
  });
// 设置我的消息为已读
export const SetReadMessage = async (data) =>
  request('IWork/SetReadMessage', {
    method: 'POST',
    data,
  });
