import { RouteConfig } from 'vue-router';
import Dashboard from '../views/dashboard.vue';
import Accounts from '../views/accounts.vue';
import DashboardLayout from '../layout/dashboard.layout.vue';
import AccountDetails from '../views/account-details.vue';
import Login from '../views/sessions/login.vue';
import multiguard from 'vue-router-multiguard';
import { isAuthenticated, handleAuthRoute } from '../middlewares/index';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: multiguard([handleAuthRoute]),
    component: Login
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    beforeEnter: multiguard([isAuthenticated]),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts
      },
      {
        path: 'accounts/:id',
        name: 'AccountDetails',
        component: AccountDetails
      }
    ]
  }
];

export default routes;
