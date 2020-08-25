const { router: demoRouter } = require('./demo-router');

module.exports = {
  
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: '欢迎',
              icon: 'smile',
              component: './Welcome',
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
