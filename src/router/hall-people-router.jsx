module.exports = {
  router: [
    {
      path: '/hall-people',
      name: 'hall-people',
      routes: [
        {
          path: '/hall-people',
          name: 'hall-people',
          component: './HallPeople',
        },
        {
          path: '/hall-people/detail',
          name: 'detail',
          component: './HallPeople/Detail',
        },
      ]
    },
    {
      path: '/hall-something',
      name: 'hall-something',
      routes: [
        {
          path: '/hall-something',
          name: 'hall-something',
          component: './HallSomething',
        },
        {
          path: '/hall-something/detail',
          name: 'detail',
          component: './HallSomething/Detail',
        },
      ]
    },
    {
      path: '/personal-homepage',
      name: 'personal-homepage',
      component: './PersonalHomepage',
    },
  ]
}