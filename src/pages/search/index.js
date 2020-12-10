import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from 'utils/api';
import { fetchSearchTarget } from 'redux/slices/search';
import { default as SubHeader } from 'components/header';
import ContentLoader from 'components/ContentLoader';
import Section from 'components/section';
import Layout from 'components/Layout';
import ProductListing from 'components/ProductListing';
import 'style/search.scss';

const EmptyState = props => {
  return (
    <div className="empty-state">
      <p>{props.text}</p>
    </div>
  );
};

const SearchResult = ({ searchResult }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleItemClick = barcode => {
    dispatch(fetchSearchTarget(barcode));
    history.push('/select-outlet');
  };
  return (
    <>
      {searchResult.length === 0 ? (
        <EmptyState text="Opps, Item not found" />
      ) : (
        <div className="row">
          {searchResult.map(item => {
            return (
              <div
                className="col"
                key={item.item.barcode}
                onClick={() => handleItemClick(item.item)}
              >
                <ProductListing
                  noFooter
                  product={item.item}
                  key={item.item.barcode}
                />
              </div>
            );
          })}{' '}
        </div>
      )}
    </>
  );
};

const Search = props => {
  const [searchResult, updateSearchResult] = useState([]);
  const [searchStatus, updateSearchStatus] = useState('start');

  const onInputChange = e => {
    // will need to debounce onChange
    updateSearchStatus('loading');
    if (e.target.value) {
      api
        .GET('search', {
          params: {
            query: e.target.value,
          },
        })
        .then(resp => {
          updateSearchStatus('end');
          updateSearchResult(resp.data.items);
        })
        .catch(function(error) {
          updateSearchStatus('end');
          console.error(error);
        });
    } else {
      updateSearchResult([]);
    }
  };
  return (
    <Layout>
      <SubHeader>
        <div className="searchbar">
          <input
            type="text"
            className="search-input truncate"
            placeholder="Search products"
            onChange={onInputChange}
          />
        </div>
      </SubHeader>
      <Section>
        {searchStatus === 'loading' && (
          <ContentLoader height="180" background="white" />
        )}
        {searchStatus === 'start' && <EmptyState text="Seach by typing" />}
        {searchStatus === 'end' && <SearchResult searchResult={searchResult} />}
      </Section>
    </Layout>
  );
};

export default Search;
