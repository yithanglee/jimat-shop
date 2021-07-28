import React, { useEffect } from 'react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { setAccessToken, skipAndContinue } from 'redux/slices/auth';
import { setInitialCarts } from 'redux/slices/carts';
import { setInitialOrders, fetchOrders } from 'redux/slices/orders';
import { hideSidebar } from 'redux/slices/ui';
import { setOnline, setOffline } from 'redux/slices/network';
import { fetchWishlist } from 'redux/slices/wishlist';
import { fetchFavouriteOutlets } from 'redux/slices/outlets';
import { fetchProfile } from 'redux/slices/auth';

import Storage from 'utils/storage';
import config from './config';

import { Header } from 'components/header';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/navbar';
import Alert from 'components/Alert';

import SelectOutlet from 'pages/outlet/selectOutlet';
import FavouriteOutlet from 'pages/favourite_outlet';
import ProfileEdit from 'pages/profile/edit';
import Landing from 'pages/landing';
import aboutJimat from 'pages/aboutJimat';
import Category from 'pages/category';
import Location from 'pages/location';
import Wishlist from 'pages/wishlist';
import Payment from 'pages/payment';
import PaymentSale from 'pages/payment/_sale_id';
import Order from 'pages/order/_id';
import Wallet from 'pages/wallet/_id';
import Product from 'pages/product';
import Profile from 'pages/profile';
import Outlet from 'pages/outlet';
import Search from 'pages/search';
import Policy from 'pages/policy';
import Orders from 'pages/order';
import Home from 'pages/home';
import Cart from 'pages/cart';
import TnC from 'pages/TnC';
import HotItems from 'pages/hotItems';
import AuthorizationWithToken from 'pages/auth';

// Sentry
if (config.ENVIRONMENT === "production") {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

function App() {
  const handleMediaQueryChange = matches => {
    dispatch(hideSidebar());
  };
  const isDesktop = useMediaQuery(
    { minWidth: 600 },
    undefined,
    handleMediaQueryChange
  );
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const isSidebarShow = useSelector(state => state.ui.showSidebar);
  const notification = useSelector(state => state.notification);
  const isLoggedIn = useSelector(state => state.auth.isUserLogin);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const isUserSkipped = Cookies.get('isSkipped');
    if (accessToken && accessToken !== 'undefined') {
      dispatch(setAccessToken({ accessToken }));
      dispatch(fetchFavouriteOutlets());
      dispatch(fetchWishlist());
    } else if (isUserSkipped === 'true') {
      dispatch(skipAndContinue());
    }
  }, [dispatch]);

  useEffect(() => {
    let carts = [];
    Storage.carts
      .iterate((value, key, iterationNumber) => {
        if (value) carts.push({ item: value });
      })
      .then(() => {
        if (carts.length > 0) dispatch(setInitialCarts(carts));
      });
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProfile());
      let orders = [];
      Storage.orders
        .iterate((value, key, iterationNumber) => {
          if (value) orders.push(value);
        })
        .then(() => {
          dispatch(fetchOrders());
          dispatch(setInitialOrders(orders));
        })
    }
  }, [dispatch, isLoggedIn]);

  // to check the initial network status
  useEffect(() => {
    navigator.onLine ? dispatch(setOnline()) : dispatch(setOffline());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  const handleOnline = () => {
    dispatch(setOnline());
  };

  const handleOffline = () => {
    dispatch(setOffline());
  };

  return (
    <Router>
      <Route
        render={({ location }) => {
          return (
            <div
              className={`body-wrapper ${isSidebarShow ||
                'withSidebar'} ${isDesktop && 'is-desktop'}`}
            >
              {location.pathname === '/' ||
                location.pathname === '/about-jimat' || (
                  <Navbar isDesktop={isDesktop} />
                )}
              <div className="body">
                <Header />
                <Alert type="error" in={!!error} content={error} />
                <Alert
                  type="notification"
                  in={!!notification}
                  content={notification}
                />
                <TransitionGroup className="transition-group min-h-full h-full md:overflow-y-auto">
                  <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames="fade"
                  >
                    <div className="page-wrapper min-h-full h-full">
                      <Switch>
                        <Route exact path={'/home'} component={Home} />
                        <Route exact path={'/order/:id'} component={Order} />
                        <Route exact path={'/wallet/:id'} component={Wallet} />
                        <Route exact path={'/outlet/:id'} component={Outlet} />
                        <Route exact path={'/product'} component={Product} />
                        <Route exact path={'/orders'} component={Orders} />
                        <Route exact path={'/profile'} component={Profile} />
                        <Route
                          exact
                          path={'/profile/edit'}
                          component={ProfileEdit}
                        />
                        <Route
                          exact
                          path={'/about-jimat'}
                          component={aboutJimat}
                        />
                        <Route exact path={'/'} component={Landing} />
                        <Route exact path={'/payment/'} component={Payment} />
                        <Route
                          exact
                          path={'/payment/:sale_id'}
                          component={PaymentSale}
                        />
                        <Route
                          exact
                          path={'/select-outlet'}
                          component={SelectOutlet}
                        />
                        <Route exact path={'/cart'} component={Cart} />
                        <Route exact path={'/terms'} component={TnC} />
                        <Route exact path={'/policy'} component={Policy} />
                        <Route exact path={'/search'} component={Search} />
                        <Route exact path={'/location'} component={Location} />
                        <Route
                          exact
                          path={'/category/:name?'}
                          component={Category}
                        />
                        <Route
                          exact
                          path={'/favourite-outlet'}
                          component={FavouriteOutlet}
                        />
                        <Route exact path={'/wishlist'} component={Wishlist} />
                        <Route exact path={'/hot-items'} component={HotItems} />
                        <Route exact path={'/auth/:token'} component={AuthorizationWithToken} />
                      </Switch>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </div>
              <Sidebar location={location} />
            </div>
          );
        }}
      />
    </Router>
  );
}

export default App;
