import Home from 'pages/home';
import Order from 'pages/order/_id';
import { default as Orders } from 'pages/order';
import Product from 'pages/product';
import Profile from 'pages/profile';
import ProfileEdit from 'pages/profile/edit';
import Outlet from 'pages/outlet';
import Cart from 'pages/cart';
import Payment from 'pages/payment';
import TnC from 'pages/TnC';
import Policy from 'pages/policy';
import Search from 'pages/search';
import Location from 'pages/location';

import SelectOutlet from 'pages/outlet/selectOutlet';

const routes = [
  {
    path: '/order/:order_id',
    component: Order,
  },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/product/',
    component: Product,
  },
  {
    path: '/orders',
    component: Orders,
  },
  {
    path: '/profile/',
    component: Profile,
  },
  {
    path: '/profile/edit',
    component: ProfileEdit,
  },
  {
    path: '/payment/:sale_id',
    component: Payment,
  },
  {
    path: '/outlet/:outlet_id',
    component: Outlet,
  },
  {
    path: '/select-outlet/',
    component: SelectOutlet,
  },
  {
    path: '/cart/',
    component: Cart,
  },
  {
    path: '/terms/',
    component: TnC,
  },
  {
    path: '/policy/',
    component: Policy,
  },
  {
    path: '/search/',
    component: Search,
  },
  {
    path: '/location',
    component: Location,
  },
];

export default routes;
