const { router: demoRouter } = require('./demo-router');

module.exports = {
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/Navigation',
          // component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/home',
            },
            {
              path: '/home',
              name: '首页',
              icon: 'smile',
              component: './Home',
            },
            // 示例路由
            ...demoRouter,

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
};
