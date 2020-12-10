import React from 'react';
import Icon from 'components/Icon';

const Home = () => {
  return <Icon type="home" stroke="#566a89" />;
};
const User = () => {
  return <Icon type="user" stroke="#566a89" />;
};
const Order = () => {
  return <Icon type="paper" stroke="#566a89" />;
};

const Tabs = [
  {
    route: '/home',
    name: 'Home',
    icon: Home,
  },
  {
    route: '/orders',
    name: 'Order',
    icon: Order,
  },
  {
    route: '/profile',
    name: 'Profile',
    icon: User,
  },
];

export default Tabs;
