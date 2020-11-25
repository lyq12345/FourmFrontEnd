import request from '@/utils/request';
// 获取祝福列表
export const GetWishList = async (data) =>
  request('/IWork/GetWishList', {
    method: 'get',
    params: data,
    // prefixType: 'mock'
  });
// 获取首页生日员工
export const GetBirthdayIndex = async (data) =>
  request('/IWork/GetBirthdayIndex', {
    method: 'get',
    params: data,
    // prefixType: 'mock'
  });

// 获取生日列表
export const GetBirthdayList = async (data) =>
  request('/IWork/GetBirthdayList', {
    method: 'get',
    params: data,
    // prefixType: 'mock'
  });

// 获取祝福图标列表
export const GetWishIconList = async (data) =>
  request('/IWork/GetWishIconList', {
    method: 'get',
    params: data,
    // prefixType: 'mock'
  });
// 发送祝福
export const AddWish = async (data) =>
  request('/IWork/AddWish', {
    method: 'POST',
    // params: data,
    data,
    // prefixType: 'mock'
  });
// 回复祝福
export const ReplyWish = async (data) =>
  request('/IWork/ReplyWish', {
    method: 'POST',
    data
    // params: data,
    // prefixType: 'mock'
  });