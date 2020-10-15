import request from '@/utils/request';

// 弹幕查询
export const coinDetailRandom = async (data) =>
  request('/coinDetail/coinDetailRandom', {
    method: 'POST',
    data,
    prefixType: 'candy'
  });

// 分页查询堂果币明细
export const coinDetailPaging = async (data) =>
  request('/coinDetail/coinDetailPaging', {
    method: 'POST',
    data,
    prefixType: 'candy'
  });

// 分页查询榜单
export const coinRankPaging = async (data) =>
  request('/coinRank/coinRankPaging', {
    method: 'POST',
    data,
    prefixType: 'candy'
  });

// 查询总堂果币和积分排名
export const getMyRank = async (data) =>
  request('/coinRank/getMyRank', {
    method: 'POST',
    data,
    prefixType: 'candy'
  });

// 查询人员信息
export const getPersonInfo = async (data) =>
  request('/coinRank/getPersonInfo', {
    method: 'POST',
    data,
    prefixType: 'candy'
  });

// 查询公司列表
export const getOrgList = async (data) =>
  request('/coinRank/getOrgList', {
    method: 'POST',
    data,
    prefixType: 'candy'
  });
