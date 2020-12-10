import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'components/Icon';
import api from 'utils/api';

const OutletDetails = props => {
  const { id, name, address, map_url } = props;
  const [isFavourite, toggleFavOutlet] = useState(false);

  const isFavOutlet = useSelector(state =>
    state.outlets.favourite_outlets.ids.includes(parseInt(id))
  );

  const toggleOutletFav = () => {
    api
      .POST(`user_profile/favourite_outlets/${id}`)
      .then(resp => {
        toggleFavOutlet(!isFavourite);
      })
      .catch(e => {
        console.error(e.error);
      });
  };

  useEffect(() => {
    toggleFavOutlet(isFavOutlet);
  }, [isFavOutlet]);

  return (
    <div className="flex justify-between items-center">
      <div className="mr-2">
        <p className="header-title">{name}</p>
        <p className="header-description">{address}</p>
      </div>
      <div className="flex text-right">
        {map_url !== undefined && (
          <a
            href={map_url}
            className="inline-block border p-2 rounded-full mr-1"
          >
            <Icon type="location" viewbox="512" />
          </a>
        )}

        <span
          className="inline-block border p-2 rounded-full"
          onClick={toggleOutletFav}
        >
          <Icon
            type="heart"
            viewbox="24"
            fill={isFavourite ? '#ed64a6' : 'none'}
            stroke={isFavourite ? 'none' : '#e2e8f0'}
          />
        </span>
      </div>
    </div>
  );
};

export default OutletDetails;
