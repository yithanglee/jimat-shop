import React, { useEffect, useState } from 'react';
import { fetchSearchTarget } from 'redux/slices/search';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from 'utils/api';
import Section from 'components/section';
import Layout from 'components/Layout';
import ProductListing from 'components/ProductListing';
import Scrollable, { ScrollableItem } from 'components/scrollable';
import { default as SubHeader } from 'components/header';
import ContentLoader from 'components/ContentLoader';
import { CATEGORIES } from 'config';

const Category = props => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [items, updateItems] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [selectedCategory, changeCategory] = useState(name);
  const handleItemClick = barcode => {
    dispatch(fetchSearchTarget(barcode));
    props.history.push('/select-outlet');
  };

  useEffect(() => {
    api
      .GET('search', {
        params: {
          category: selectedCategory,
        },
      })
      .then(resp => {
        updateItems(resp.data.items);
        setLoading(false);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, [selectedCategory, loading]);
  return (
    <Layout>
      <SubHeader>
        <Scrollable>
          {CATEGORIES.map((item, index) => (
            <ScrollableItem width="105px" key={index}>
              <div
                className={`category ${selectedCategory === item.name &&
                  'selected'}`}
                onClick={() => {
                  updateItems([]);
                  changeCategory(item.name);
                }}
              >
                <img src={item.url} alt={item.name} />
                <p
                  className={`text text-sm font-bold leading-4 ${
                    selectedCategory === item.name
                      ? 'text-yellow-300'
                      : 'text-white'
                  }`}
                >
                  {item.name}
                </p>
              </div>
            </ScrollableItem>
          ))}
        </Scrollable>
      </SubHeader>
      <Section>
        {loading && (
          <ContentLoader height="180" background="white" />
        )}
        {!loading && items.length === 0 ? (
          <div class="flex items-center justify center p-20 text-center">No products available under this category and brand.</div>
        ) : 
        (<div className="row">
          {items.map(item => (
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
          ))}
        </div>)}
      </Section>
    </Layout>
  );
};

export default Category;
