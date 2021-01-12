module.exports = {
  router: [
    {
      path: '/bbs/',
      name: '堂里论坛',
      redirect: '/bbs/home',
    },
    {
      path: '/bbs/home',
      name: '堂里论坛',
      component: './BBS/Home',
    },
    {
      path: '/bbs/message',
      name: '消息',
      component: './BBS/Message',
    },
    {
      path: '/bbs/square',
      name: '广场',
      routes: [
        {
          path: '/bbs/square/',
          name: '广场',
          component: '../pages/BBS/Square',
        },
        {
          path: '/bbs/square/:squareId',
          name: '广场详情',
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
      name: '帖子详情',
      component: './BBS/Post',
    },
  ],
};
