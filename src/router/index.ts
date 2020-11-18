const { router: demoRouter } = require('./demo-router');
const { router: hallPeopleRouter } = require('./hall-people-router');
const { router: birthdayWishRouter } = require('./birthday-wish-router');


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
            ...hallPeopleRouter,
            ...birthdayWishRouter,

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
