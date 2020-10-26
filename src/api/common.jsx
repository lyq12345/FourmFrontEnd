import request from '@/utils/request';

// 获取首页考勤
export const GetAtten = async (data) =>
  request('/IWork/GetAtten', {
    method: 'get',
    params: data,
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
    params: data,
  });
// 获取首页堂里新鲜事
export const GetAffairIndex = async (data) =>
  request('/IWork/GetAffairIndex', {
    method: 'get',
    params: data,
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
