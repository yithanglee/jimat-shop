import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { fetchOutlets } from 'redux/slices/outlets';
import { fetchBanners } from 'redux/slices/banners';
import { fetchOrders, getPendingOrders } from 'redux/slices/orders';
import { fetchHotItems } from 'redux/slices/stocks';
import { fetchPromoItems } from 'redux/slices/stocks';

import OutletListing from 'components/OutletListing';
import AuthBanner from 'components/AuthBanner';
import Section from 'components/section';
import Layout from 'components/Layout';

import 'style/home.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NotificationBanner from './NotificationBanner';
import Banner from './Banner';
import ScrollableProduct from './ScrollableProduct';
import ScrollablePromoProduct from './ScrollablePromoProduct';
import ScrollableCategory from './ScrollableCategory';

const Home = props => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 480px)' });
  const isSignIn = useSelector(state => state.auth.isUserLogin);
  const hotItems = useSelector(state => state.stocks.hotItems);
  const promoItems = useSelector(state => state.stocks.promoItems);
  const banners = useSelector(state => {
    return state.banner.items;
  });

  const isBannerLoading = useSelector(state => {
    return state.banner.loading;
  });

  const outlets = useSelector(state => {
    return isDesktop
      ? state.outlets.outlets
      : state.outlets.outlets.slice(0, 3);
  });

  const isFetchingOrders = useSelector(state => {
    return state.orders.loading;
  });

  const pendingOrders = useSelector(state => getPendingOrders(state));
  const selectedLocation = useSelector(
    state => state.location.selectedLocation
  );

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchHotItems());
    dispatch(fetchPromoItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOutlets(null, selectedLocation));
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    if (isSignIn) dispatch(fetchOrders());
  }, [dispatch, isSignIn]);

  return (
    <Layout klass="relative top-20 md:top-0">
      <Section>
        {isSignIn ? (
          <NotificationBanner
            isLoading={isFetchingOrders}
            orders={pendingOrders}
          />
        ) : (
          <AuthBanner />
        )}
      </Section>
      <Section>
        <Banner isLoading={isBannerLoading} banners={banners} />
      </Section>
      <Section
        isHidden={!hotItems.length}
        header="Hot Items"
        padding="vertical"
        link={'/hot-items/'}
      >
        <ScrollableProduct hotItems={hotItems.slice(0, 8)} />
      </Section>

      <Section
        isHidden={!promoItems.length}
        header="Current Promo Items"
        padding="vertical"
        link={'/promo-items/'}
      >
        <ScrollablePromoProduct promoItems={promoItems.slice(0, 8)} />
      </Section>

      <Section header="Category" padding="vertical">
        <ScrollableCategory {...props} />
      </Section>
      <Section
        padding="px-4 px-0 pb-40 md:pb-20"
        header="Shops Nearby"
        link={isDesktop ? null : '/select-outlet/'}
      >
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4`}>
          {outlets.length > 0
            ? outlets.map(outlet => (
              <OutletListing
                key={outlet.id}
                outlet={outlet}
                comingSoon={outlet.status === 'coming_soon'}
              />))
            : <div className="text-gray-600 py-4">
                <p className="text-sm">We're sorry!</p>
                <p className="text-sm">No available shops nearby <strong>{selectedLocation}</strong></p>
              </div>
          }
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
