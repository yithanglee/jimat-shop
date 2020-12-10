import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Collapsible from 'react-collapsible';

import { default as SubHeader } from 'components/header';
import Icon from 'components/Icon';
import Section from 'components/section';
import Layout from 'components/Layout';
import Listing from 'components/Listing';
import { selectLocation, fetchLocations } from 'redux/slices/location';
import 'style/location.scss';

const Tick = () => {
  return <Icon type="tick" stroke="#000000" size="small" />;
};

const ComingSoon = () => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-300 text-white">
      Coming Soon
    </span>
  );
};

const Location = props => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    state => state.location.selectedLocation
  );
  const selectedState = useSelector(state => state.location.selectedState);

  const allLocations = useSelector(state => state.location.locations);

  const handleLocationSelection = (city, state) => {
    dispatch(selectLocation({ city: city, state: state }));
    props.history.goBack();
  };

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <Layout>
      <SubHeader>
        <p className="header-title"> Select Location </p>
        <p className="header-description">Choose store nearest to you</p>
      </SubHeader>
      <Section padding="none">
        <div className="location">
          {allLocations.map((location, index) => {
            return (
              <Collapsible
                transitionTime={200}
                trigger={location.state}
                key={index}
                triggerOpenedClassName="active"
                open={location.state === selectedState}
              >
                {location.cities.map((city, index) => {
                  return (
                    <Listing
                      key={index}
                      action={
                        city.status === 'coming_soon'
                          ? ComingSoon
                          : selectedLocation === city.name
                          ? Tick
                          : ''
                      }
                      onClick={() => {
                        if (city.status !== 'coming_soon') {
                          handleLocationSelection(city.name, location.state);
                        }
                      }}
                    >
                      {city.status === 'coming_soon' ? (
                        <p className="text-sm leading-5 font-regular text-gray-300">
                          {city.name}
                        </p>
                      ) : (
                        <p className="text-sm leading-5 font-regular text-gray-900">
                          {city.name}
                        </p>
                      )}
                    </Listing>
                  );
                })}
              </Collapsible>
            );
          })}
        </div>
      </Section>
    </Layout>
  );
};

export default Location;
