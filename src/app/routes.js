import Home from 'pages/Home'
import Experiences from 'pages/Experiences'
import Experience from 'pages/Experience'
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
      name: 'experiences',
      paths: {
        all: '/experiences'
      },
      component: Experiences
    },
    {
      name: 'experience',
      paths: {
        all: '/experiences/:slug'
      },
      component: Experience
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
