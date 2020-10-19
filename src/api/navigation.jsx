import request from '@/utils/request';

// 获取导航
export const GetAllMenu = async (data) =>
  request('/IWork/GetAllMenu', {
    method: 'GET',
    data,
  });

// 获取我的导航
export const GetMenuMy = async (data) =>
  request('/IWork/GetMenuMy', {
    method: 'GET',
    data,
  });

// 获取我的导航
export const SaveMyMenu = async (data) =>
  request('/IWork/SaveMyMenu', {
    method: 'POST',
    data,
  });
