import request from '@/utils/request';

// 分页查询归还单列表
export const coinDetailRandom = async (data) =>
  request('/coinDetail/coinDetailRandom', {
    method: 'POST',
    data,
  });
