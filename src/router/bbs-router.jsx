module.exports = {
  router: [
    {
      path: '/bbs/',
      name: '首页',
      redirect: '/bbs/home',
    },
    {
      path: '/bbs/home',
      name: '首页',
      component: './BBS/Home',
    },
    {
      path: '/bbs/message',
      name: '消息',
    },
    {
      path: '/bbs/square',
      name: '广场',
      routes: [
        {
          path: '/bbs/square/',
          component: '../pages/BBS/Square',
        },
        {
          path: '/bbs/square/:squareId',
          component: '../pages/BBS/Square/SquareItem',
        },
      ],
    },
    {
      path: '/bbs/mine',
      name: '我的',
      component: './BBS/Mine',
    },
    {
      path: '/bbs/post/:postId',
      component: './BBS/Post',
    },
  ],
};
