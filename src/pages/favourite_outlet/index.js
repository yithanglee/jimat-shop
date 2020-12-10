import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Section from 'components/section';
import { default as SubHeader } from 'components/header';
import Layout from 'components/Layout';
import OutletListing from 'components/OutletListing';
import { fetchFavouriteOutlets } from 'redux/slices/outlets';
import 'style/term.scss';

const FavouriteOutlet = () => {
  const dispatch = useDispatch();
  const favouriteOutlets = useSelector(
    state => state.outlets.favourite_outlets
  );
  useEffect(() => {
    dispatch(fetchFavouriteOutlets());
  }, [dispatch]);
  return (
    <Layout>
      <SubHeader>
        <p className="header-title">Favourite Outlet</p>
        <p className="header-description">
          {favouriteOutlets && favouriteOutlets.items.length} Favourite Outlet
        </p>
      </SubHeader>
      <Section padding="vertical">
        <div className="outlet-list">
          {favouriteOutlets.items.map((item, index) => (
            <OutletListing key={index} outlet={item} />
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default FavouriteOutlet;
