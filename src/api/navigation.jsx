import request from '@/utils/request';

// 获取导航
export const GetAllMenu = async (data) =>
  request('/IWork/GetAllMenu', {
    method: 'GET',
    data,
  });