/*
 * @Author: your name
 * @Date: 2020-08-31 15:52:32
 * @LastEditTime: 2020-09-04 13:55:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/router/demo-router.ts
 */
/**
 * TODO: 仅示例使用 建议删除或重命名
 */
module.exports = {
  router: [
    {
      path: '/nav-setting',
      name: '导航设置',
      component: './NavSetting',
    },
    {
      path: '/tangguobi-rank',
      name: '堂果币排行榜',
      component: './TangguobiRank',
    },
    {
      path: '/tangguobi',
      name: '堂果币主页',
      component: '@/components/TangGuoBi',
    },
  ],
};
