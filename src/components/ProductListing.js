import React, { useState } from 'react';

import Icon from 'components/Icon';
import CartButton from 'components/CartButton';
import api from 'utils/api';
import 'style/product-listing.scss';

const discountedPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice == null || discountedPrice == null) {
    return false;
  }

  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

const WishlistStar = ({ active, id, accessToken }) => {
  // TODO: should put inside redux
  const toggleWishlist = id => {
    api
      .POST(`profile/wishlist/${id}`)
      .then(resp => {
        // should show notification that item is wishlisted
      })
      .catch(function(resp) {
        console.error(resp.error);
      });
  };

  // TODO: should get from redux, single source of truth
  const [isActive, toggleStatus] = useState(active);

  if (accessToken) {
    return (
      <span
        onClick={() => {
          toggleStatus(!isActive);
          toggleWishlist(id);
        }}
      >
        <Icon
          type="star"
          stroke={isActive ? '#f0b21a' : '#99aab3'}
          fill={isActive ? '#f0b21a' : 'none'}
        />
      </span>
    );
  } else {
    return null;
  }
};

const ProductFooter = props => {
  if (props.readonly) {
    return (
      <div className="product-quantity">
        <p className="text-md leading-5 font-bold font-medium text-black">
          {props.product.quantity} units
        </p>
      </div>
    );
  }

  if (props.product.quantity_in_stock === 0) {
    return (
      <div className="product-quantity">
        <p className="text-xs font-bold leading-7 text-red-500 uppercase">Out of Stock</p>
      </div>
    );
  }

  return (
    <CartButton
      error={props.error}
      quantity={props.quantityInCart}
      addToCart={props.addToCart}
      removeFromCart={props.removeFromCart}
    />
  );
};

const ProductListing = props => {
  const type = props.horizontal ? 'horizontal' : 'vertical';
  const hideFooter = props.noFooter;
  const product = props.product;
  const active = props.active;
  const error =
    props.product.quantity_in_stock !== 0 &&
    props.quantityInCart >= props.product.quantity_in_stock;
  const accessToken = props.accessToken;
  const addToCart = () => {
    props.addToCart(product);
  };
  const discount = discountedPercentage(
    product.original_price_cents,
    product.discounted_price_cents
  );
  const removeFromCart = () => {
    props.removeFromCart(product);
  };

  const isVertical = type === 'vertical';

  return (
    <div
      className={`rounded-lg shadow-lg hover:shadow-md overflow-hidden grid grid-rows-2 gap-0 product ${type} ${hideFooter ||
        'padding'}`}
    >
      {props.promotion && (
        <span className="promotion-badge">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-blue-600 text-white">
            {props.tag || (props.product.tag || 'Promo')}
          </span>
        </span>
      )}
      {discount && discount > 5 ? (
        <span className="promotion-badge">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium leading-5 bg-red-500 text-white">
            {`${discount}% OFF`}
          </span>
        </span>
      ) : (
        ''
      )}
      {props.wishlist && (
        <span className="wishlist-star">
          <WishlistStar
            id={product.barcode}
            active={active}
            accessToken={accessToken}
          />
        </span>
      )}

      <div className="product-img large mx-auto text-center row-span-2">
        <img alt={product.name} src={product.image_url} className="mx-auto" />
      </div>
      <div className={`product-details grid gap-0 ${hideFooter ? 'grid-rows-2' : 'grid-rows-3'}`}>
        {/* Note:
          this is hide for now, because it doesn't provide any meaning
          this was implemented to show whether the item is under BA-100
        */}
        {false && isVertical && (
          <div className="bg-blue-900 text-white font-bold text-xs text-center">
            Product JiMAT
          </div>
        )}
        <div className="product-info row-span-2">
          <div className="product-name">
            <p className="text-sm md:text-md text-gray-800 mb-2">
              {product.name}
            </p>
            {!hideFooter && (
              <p className="text-md product-price md:text-lg font-bold text-blue-900">
                {product.discounted_price || product.price}
                <span className="font-medium line-through text-xs text-gray-500 inline-block ml-1">
                  {product.original_price}
                </span>
              </p>
            )}
          </div>
          {error && (
            <span className="mb-2 block items-center px-2 py-2 rounded text-xs font-medium leading-tight bg-pink-100 text-pink-800">
              You have reached max stocks left.
            </span>
          )}

          {hideFooter && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Lowest Price</p>
              <p className="text-md font-bold text-blue-900">
                <span className="font-medium line-through text-xs text-gray-500 inline-block mr-1">
                  {product.original_price}
                </span>
                {product.hot ? product.hot_price : product.min_price}
              </p>
            </div>
          )}
        </div>
        
        {!hideFooter && (
          <div className="product-footer">
            <ProductFooter
              error={error}
              readonly={props.readonly}
              quantityInCart={props.quantityInCart}
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
