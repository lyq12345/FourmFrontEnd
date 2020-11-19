/*
 * @Author: your name
 * @Date: 2020-11-17 10:48:31
 * @LastEditTime: 2020-11-17 11:07:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/src/router/index.ts
 */
const { router: demoRouter } = require('./demo-router');
const { router: hallPeopleRouter } = require('./hall-people-router');
const { router: bbsRouter } = require('./bbs-router');

module.exports = {
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/bbs',
          name: 'iwork论坛',
          component: '../layouts/BBSLayout/index.tsx',
          routes: [...bbsRouter],
        },
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
