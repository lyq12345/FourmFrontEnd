import request from '@/utils/request';

// 获取基本信息
export const GetEmpInfo = async (data) =>
  request(`/default/GetEmpInfo`, {
    method: 'get',
    params: data,
    prefixType: 'home-page'
  });
// 获取个人信息
export const getPernrInfo = async (data) =>
  request('/Default/getPernrInfo', {
    method: 'POST',
    data,
    prefixType: 'home-page'
  });

// 修改联系方式
export const EditEmpInfo = async (data) =>
  request('/default/EditEmpInfo', {
    method: 'get',
    params: data,
    prefixType: 'home-page'
  });

// 修改个人信息
export const updatePernrInfo = async (data) =>
  request(`/default/updatePernrInfo`, {
    method: 'get',
    params: data,
    prefixType: 'home-page'
  });

// 获取家庭信息
export const getFamilyInfo = async (data) =>
  request('/default/getFamilyInfo', {
    method: 'POST',
    data,
    prefixType: 'home-page'
  });

// 新增紧急联络人和家庭成员
export const addFamilyInfo = async (data) =>
  request('/default/addFamilyInfo', {
    method: 'POST',
    data,
    prefixType: 'home-page'
  });

// 更新紧急联络人和家庭成员
export const updateFamilyInfo = async (data) =>
  request('/default/updateFamilyInfo', {
    method: 'POST',
    data,
    prefixType: 'home-page'
  });
// 查询员工的堂果币信息
export const getMyCoin = async (data) =>
  request('/default/getMyCoin', {
    method: 'get',
    params: data,
    prefixType: 'home-page'
  });
// 编辑紧急联络人和家庭成员
export const editFamilyInfo = async (data) =>
  request('/default/editFamilyInfo', {
    method: 'get',
    params: data,
    prefixType: 'home-page'
  });


