module.exports = {
  router: [
    {
      path: '/hall-people',
      name: '每周堂里人',
      routes: [
        {
          path: '/hall-people',
          name: '每周堂里人',
          component: './HallPeople',
        },
        {
          path: '/hall-people/detail',
          name: '每周堂里人详情',
          component: './HallPeople/Detail',
        },
      ],
    },
    {
      path: '/hall-something',
      name: '热门技术帖',
      routes: [
        {
          path: '/hall-something',
          name: '热门技术帖',
          component: './HallSomething',
        },
        {
          path: '/hall-something/detail',
          name: '热门技术帖详情',
          component: './HallSomething/Detail',
        },
      ],
    },
    {
      path: '/personal-homepage',
      name: '个人主页',
      component: './PersonalHomepage',
    },
  ],
};
