import Home from 'pages/Home'
import About from 'pages/About'
import NotFound from 'pages/NotFound'

export default {
  base: false,
  opts: {},
  routes: [
    {
      name: 'home',
      paths: {
        all: '/'
      },
      negative: true,
      component: Home
    },
    {
      name: 'about',
      paths: {
        en: '/about',
        fr: '/a-propos'
      },
      component: About
    },
    {
      name: 'notfound',
      paths: {
        all: '*'
      },
      component: NotFound
    }
  ]
}
