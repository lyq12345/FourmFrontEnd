import request from '@/utils/request';

// 获取基本信息
export const listCityInfosByParentId = async (data) =>
  request('/cityInfo/listCityInfosByParentId', {
    method: 'POST',
    data,
    prefixType: 'basic',
  });