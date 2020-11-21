module.exports = {
  router: [
    {
      path: '/bbs/test',
      name: '测试组件',
      component: './BBS',
    },
    {
      path: '/bbs/',
      name: '首页',
    },
    {
      path: '/bbs/posts',
      name: '消息',
      component: '../pages/BBS/Square',
    },
    {
      path: '/bbs/square',
      name: '广场',
    },
    {
      path: '/bbs/mine',
      name: '我的',
    },
  ],
};
