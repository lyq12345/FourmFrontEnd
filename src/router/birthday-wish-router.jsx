module.exports = {
  router: [
    {
      path: '/birthday-wish',
      name: '近期过生日的堂里人',
      routes: [
        {
          path: '/birthday-wish',
          name: '近期过生日的堂里人',
          component: './BirthdayWish',
        },
        {
          path: '/birthday-wish/BlessingWall',
          name: 'ta收到的祝福',
          component: './birthdayWish/BlessingWall',
        },
        {
          path: '/birthday-wish/SendWishList',
          name: '我送出的祝福',
          component: './birthdayWish/SendWishList',
        },
        {
          path: '/birthday-wish/myReceiveWish',
          name: '我收到的祝福',
          component: './birthdayWish/BlessingWall',
        },
      ]
    }
  ]
}