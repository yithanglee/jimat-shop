import React from 'react';
import { useSelector } from 'react-redux';
import withLoader from 'components/helper/withLoader';
import ProductListing from 'components/ProductListing';

const StocksListing = ({ stocks, addItem, removeItem, outletId }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const carts = useSelector(state => state.carts.byId);
  const wishlistedItems = useSelector(state => state.wishlist.ids);

  return (
    <div className="outlet-item-row">
      {stocks.map(item => {
        return (
          <div className="outlet-item-col" key={item.barcode}>
            <ProductListing
              vertical
              product={item}
              wishlist
              image_preview={true}
              quantityInCart={
                carts[item.barcode] && carts[item.barcode].outletId === outletId
                  ? carts[item.barcode].quantity
                  : 0
              }
              active={
                !!wishlistedItems && wishlistedItems.includes(item.barcode)
              }
              addToCart={addItem}
              removeFromCart={removeItem}
              accessToken={accessToken}
            />
          </div>
        );
      })}
    </div>
  );
};

export default withLoader(StocksListing, { height: '200', bgColor: 'white' });
