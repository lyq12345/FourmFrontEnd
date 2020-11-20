module.exports = {
  router: [
    {
      path: '/birthdayWish',
      name: '近期过生日的堂里人',
      routes: [
        {
          path: '/birthdayWish',
          name: '近期过生日的堂里人',
          component: './BirthdayWish',
        },
        {
          path: '/birthdayWish/BlessingWall',
          name: 'ta收到的祝福',
          component: './birthdayWish/BlessingWall',
        },
        {
          path: '/birthdayWish/SendWishList',
          name: 'ta收到的祝福',
          component: './birthdayWish/SendWishList',
        },
      ]
    }
  ]
}