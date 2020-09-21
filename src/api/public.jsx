import request from '@/utils/request';

// 获取基本信息
export const listCityInfos = async (data) =>
  request('/cityInfo/listCityInfos', {
    method: 'POST',
    data,
    prefixType: 'basic',
  });