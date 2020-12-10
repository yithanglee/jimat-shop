import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSearchTarget } from 'redux/slices/search';
import ProductListing from 'components/ProductListing';
import { default as SubHeader } from 'components/header';
import Layout from 'components/Layout';

const HotItem = () => {
  const hotItems = useSelector(state => state.stocks.hotItems);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleItemClick = item => {
    dispatch(fetchSearchTarget(item));
    history.push(`/select-outlet?item=${item.barcode}`);
  };
  return (
    <Layout>
      <SubHeader>
        <p className="header-title">
          <span role="img" aria-label="fire">
            🔥
          </span>
          Hot Items
        </p>
        <p className="header-description">Limited Time. Buy while it lasts.</p>
      </SubHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-2 lg:p-5">
        {hotItems.map(item => (
          <div onClick={() => handleItemClick(item.item)}>
            <ProductListing promotion noFooter product={item.item} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HotItem;
