/**
 * TODO: 仅示例使用 建议删除或重命名
 */
module.exports = {
  router: [
    {
      path: '/demo',
      name: '示例菜单',
      options: '<DashboardOutlined/>',
      routes: [
        {
          path: '/demo/child',
          name: '示例子页面',
          component: './Demo/Child',
        },
      ],
    },
  ],
};
