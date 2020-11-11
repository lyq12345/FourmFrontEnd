import request from '@/utils/request';

// 获取基本信息
export const listCityInfosByParentId = async (data) =>
  request('/cityInfo/listCityInfosByParentId', {
    method: 'POST',
    data,
    prefixType: 'basic',
  });

// 获取基本信息
export const LoginIn = async (data) =>
  request('/IWork/LoginIn', {
    method: 'get',
    params: data,
  });