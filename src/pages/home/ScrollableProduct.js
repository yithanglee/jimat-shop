import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchSearchTarget } from 'redux/slices/search';
import Scrollable, { ScrollableItem } from 'components/scrollable';
import ProductListing from 'components/ProductListing';

const ScrollableProduct = ({ hotItems, length }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleItemClick = item => {
    dispatch(fetchSearchTarget(item));
    history.push(`/select-outlet?item=${item.barcode}`);
  };
  return (
    <Scrollable>
      {hotItems.map(item => (
        <ScrollableItem width={200} key={item.item.barcode}>
          <div onClick={() => handleItemClick(item.item)}>
            <ProductListing promotion noFooter product={item.item} />
          </div>
        </ScrollableItem>
      ))}
      {hotItems.length === 8 && (
        <ScrollableItem width={200}>
          <Link to={'hot-items'}>
            <div className="bg-indigo-200 shadow rounded h-full flex items-center justify-center hover:shadow-lg cursor-pointer transition ease-in-out duration-500">
              <div className="font-bold rounded-full bg-white px-6 py-10">
                View More
                <br />
                Promotions
              </div>
            </div>
          </Link>
        </ScrollableItem>
      )}
    </Scrollable>
  );
};

export default ScrollableProduct;
