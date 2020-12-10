import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchWishlist } from 'redux/slices/wishlist';
import { default as SubHeader } from 'components/header';
import Layout from 'components/Layout';
import Section from 'components/section';
import ProductListing from 'components/ProductListing';
import 'style/term.scss';

const Wishlist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const wishlist = useSelector(state => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleItemClick = item => {
    history.push(`/select-outlet?item=${item.barcode}`);
  };

  return (
    <Layout>
      <SubHeader>
        <p className="header-title">Wishlist Item</p>
        <p className="header-description">
          {wishlist && wishlist.length} items are waiting for you to bring them
          home
        </p>
      </SubHeader>
      <Section>
        <div className="row">
          {wishlist &&
            wishlist.map(item => {
              return (
                <div
                  className="col"
                  key={item.item.barcode}
                  onClick={() => handleItemClick(item.item)}
                >
                  <ProductListing
                    product={item.item}
                    key={item.item.barcode}
                    quantityInCart={item.item.quantity}
                    promotion={false}
                    noFooter
                  />
                </div>
              );
            })}
        </div>
      </Section>
    </Layout>
  );
};

export default Wishlist;
