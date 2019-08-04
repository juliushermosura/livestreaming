import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import Following from '@/components/Following'
import ForgotPassword from '@/components/ForgotPassword'
import Register from '@/components/Register'
import PageNotFound from '@/components/404'
import Oauth2callback from '@/components/Oauth2callback'
import PurchaseHistory from '@/components/History'
import Stream from '@/components/Stream'
import List from '@/components/List'
import Category from '@/components/Category'
import Events from '@/components/Events'
import Messages from '@/components/Messages'
import Transactions from '@/components/Transactions'
import Help from '@/components/Help'
import Recent from '@/components/Recent'
import Settings from '@/components/Settings'
import Broadcast from '@/components/Broadcast'
import AboutUs from '@/components/AboutUs'

Vue.use(Router)

function requireAuth (to, from, next) {
  // var authenticated = localStorage.getItem('session')
  // if (authenticated === null || authenticated === '[]') {
  //   next({
  //     path: '/login',
  //     query: {
  //       redirect: to.fullPath
  //     }
  //   })
  // } else {
  next()
  // }
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        plainLayout: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        plainLayout: true
      }
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        plainLayout: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Login,
      meta: {
        plainLayout: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/history',
      name: 'PurchaseHistory',
      component: PurchaseHistory,
      beforeEnter: requireAuth
    },
    {
      path: '/list',
      name: 'List',
      component: List,
      beforeEnter: requireAuth
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
      beforeEnter: requireAuth
    },
    {
      path: '/stream',
      name: 'Stream',
      component: Stream,
      beforeEnter: requireAuth
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      beforeEnter: requireAuth
    },
    {
      path: '/',
      name: 'Main',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/recent',
      name: 'Recent',
      component: Recent,
      beforeEnter: requireAuth
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      beforeEnter: requireAuth
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast,
      beforeEnter: requireAuth
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions,
      beforeEnter: requireAuth
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      beforeEnter: requireAuth
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: requireAuth
    },
    {
      path: '/following',
      name: 'Following',
      component: Following,
      beforeEnter: requireAuth
    },
    {
      path: '/oauth2callback',
      name: 'Oauth2callbackk',
      component: Oauth2callback,
      beforeEnter: requireAuth
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs,
      beforeEnter: requireAuth
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
