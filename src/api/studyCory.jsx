import request from '@/utils/request';
// 课程类型查询
export const courseFront = async (data) =>
  request('/secondary/api/v1/course-study/course-front', {
    method: 'POST',
    // params: data,
    data,
    prefixType: 'studyCore',
  });