import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { default as SubHeader } from 'components/header';
import Section from 'components/section';
import OutletListing from 'components/OutletListing';
import Layout from 'components/Layout';
import { fetchOutlets } from 'redux/slices/outlets';

const SelectOutlet = () => {
  const dispatch = useDispatch();
  const outlets = useSelector(state => state.outlets.outlets);
  const selectedLocation = useSelector(
    state => state.location.selectedLocation
  );
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  React.useEffect(() => {
    dispatch(fetchOutlets(parsed.item, selectedLocation));
  }, [dispatch, selectedLocation, parsed.item]);

  return (
    <Layout>
      <SubHeader withCart>
        {(parsed['item']) 
          ? <div>
            <p className="header-title">
              {outlets.length > 0 && outlets[0].stock?.item.name}
            </p>
            <p className="header-description">
              {outlets.length} shops available for this item.
            </p>
          </div>
          : <div>
            <p className="header-title">
              Shop in&nbsp;
              <span className="change-location">{selectedLocation}</span>
            </p>
            <p className="header-description">
              {outlets.length} Shops open in this area
            </p>
          </div>
        }
       
      </SubHeader>
      <Section padding="vertical">
        <div className="outlet-list px-3">
          {outlets.map((item, index) => (
            <OutletListing
              key={index}
              outlet={item}
              scope={parsed['item'] ? 'details' : 'general'}
              comingSoon={item.status === 'coming_soon'}
            />
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default SelectOutlet;
