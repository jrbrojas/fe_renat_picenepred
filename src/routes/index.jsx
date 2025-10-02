// All components mapping with path for internal routes
//import Dashboard from '../features/dashboard/index';

import { lazy } from 'react'

const Dashboard = lazy(() => import('../views/protected/Dashboard'))
//const Welcome = lazy(() => import('../views/protected/Welcome'))
//const Page404 = lazy(() => import('../views/protected/404'))
//const Blank = lazy(() => import('../views/protected/Blank'))
//const Charts = lazy(() => import('../views/protected/Charts'))
//const Leads = lazy(() => import('../views/protected/Leads'))
//const Integration = lazy(() => import('../views/protected/Integration'))
//const Calendar = lazy(() => import('../views/protected/Calendar'))
//const Team = lazy(() => import('../views/protected/Team'))
//const Transactions = lazy(() => import('../views/protected/Transactions'))
//const Bills = lazy(() => import('../views/protected/Bills'))
//const ProfileSettings = lazy(() => import('../views/protected/ProfileSettings'))
//const GettingStarted = lazy(() => import('../views/GettingStarted'))
//const DocFeatures = lazy(() => import('../views/DocFeatures'))
//const DocComponents = lazy(() => import('../views/DocComponents'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  //{
  //  path: '/welcome', // the url
  //  component: Welcome, // view rendered
  //},
  {
    path: '/leads',
    //component: Leads,
    component: Dashboard,
  },
  //{
  //  path: '/settings-team',
  //  component: Team,
  //},
  //{
  //  path: '/calendar',
  //  component: Calendar,
  //},
  //{
  //  path: '/transactions',
  //  component: Transactions,
  //},
  //{
  //  path: '/settings-profile',
  //  component: ProfileSettings,
  //},
  //{
  //  path: '/settings-billing',
  //  component: Bills,
  //},
  //{
  //  path: '/getting-started',
  //  component: GettingStarted,
  //},
  //{
  //  path: '/features',
  //  component: DocFeatures,
  //},
  //{
  //  path: '/components',
  //  component: DocComponents,
  //},
  //{
  //  path: '/integration',
  //  component: Integration,
  //},
  //{
  //  path: '/charts',
  //  component: Charts,
  //},
  //{
  //  path: '/404',
  //  component: Page404,
  //},
  //{
  //  path: '/blank',
  //  component: Blank,
  //},
]

export default routes
