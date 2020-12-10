import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { catchNotification } from 'redux/slices/notification';

import { default as SubHeader } from 'components/header';
import Section from 'components/section';
import Layout from 'components/Layout';
import api from 'utils/api';

// Notes
// ------------------------------------------------------------------
// Added styling for input. This is temporary until we edit Jimat-UI.
// Not using Input Component from Jimat-UI
// because it is not compatible with react-hook-form
import 'style/profile.scss';

const fields = [
  {
    field: 'Name', type: 'text', disabled: false, store_name: 'name', opts: {
      maxLength: { value: 150, message: "Input must not exceed 150 characters" }
    }
  },
  {
    field: 'Email', type: 'email', disabled: true, store_name: 'email', opts: {
      maxLength: { value: 150, message: "Input must not exceed 150 characters" }
    }
  },
  {
    field: 'IC Number *', type: 'text', disabled: false, store_name: 'ic_number', opts: {
      maxLength: { value: 12, message: "Input must not exceed 14 characters" },
      pattern: { value: /\d+/, message: "Please enter valid IC number!" }
    }
  },
  {
    field: 'Phone', type: 'text', disabled: false, store_name: 'phone', opts: {
      maxLength: { value: 12, message: "Input must not exceed 12 characters" },
      pattern: { value: /\d+/, message: "Please enter valid phone number!" }
    }
  },
];

const restructureLocation = locations => {
  let res = {};
  locations.forEach(location => {
    res[location.state] = location.cities;
  });
  return res;
};

const getCity = (cities, c) => {
  if (!cities || !cities.length) return
  const city = cities.find((x) => x.name === c)
  return city.id
}

const AddressForm = props => {
  const register = props.register;
  const address = props.address || '';

  let [states, updateState] = useState();
  let [cities, updateCities] = useState([]);
  let [location, updateLocation] = useState([]);

  useEffect(() => {
    api
      .GET('/locations/all')
      .then(function (response) {
        updateLocation(restructureLocation(response.data.items));
        updateState(address.state);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [address.state]);

  useEffect(() => {
    updateCities(location[address.state])
  }, [location, address])

  return (
    <div className="hidden mt-8 border-t border-gray-200 pt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your Address
        </h3>
        <p className="mt-1 text-sm leading-5 text-gray-500">
          Use a permanent address as your delivery address
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="line1"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Line 1
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="streetline1address"
              name="address.line1"
              className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ref={register}
              defaultValue={address.line1}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="line2"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Line 2
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="line2"
              name="address.line2"
              className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ref={register}
              defaultValue={address.line2}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            State / Province
          </label>

          <div className="mt-1 rounded-md shadow-sm">
            <select
              id="state"
              name="address.state"
              className="block form-input form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ref={register}
              defaultValue={address.state || null}
              onChange={e => {
                updateState(e.target.value);
              }}
            >
              {Object.keys(location).map((state, index) => {
                return (
                  <option
                    value={state}
                    key={index}
                  >
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            City
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <select
              id="city"
              name="address.city_id"
              ref={register}
              defaultValue={getCity(cities, address.city) || null}
              className="block form-input form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            >
              {states &&
                location[states].map((city, index) => {
                  return (
                    <option
                      key={index}
                      value={city.id}
                    >
                      {city.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="postcode"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            ZIP / Postal
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="postcode"
              ref={register}
              defaultValue={address.postcode}
              name="address.postcode"
              className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileEdit = props => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all"
  });
  const user = useSelector(state => {
    return state.auth.user.jimat;
  });

  const onSubmit = data => {
    api
      .PUT('user_profile', {
        user: {
          ...data,
        },
      })
      .then(function (response) {
        props.history.goBack();
        dispatch(
          catchNotification({
            header: 'Update Profile Successfully',
            message: '',
          })
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Layout>
      <SubHeader>
        <p className="header-title">My Details</p>
        <p className="header-description">Edit your details</p>
      </SubHeader>
      <Section>
        <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form">
          <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
            {fields.map((input, index) => {
              const field = fields[index].store_name
              return (
                <div className="sm:col-span-3" key={index}>
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    {input.field}
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      name={input.store_name}
                      type={input.type}
                      disabled={input.disabled}
                      ref={register(input.opts)}
                      placeholder={input.field}
                      defaultValue={user[input.store_name]}
                      className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  {field === input.store_name && errors[field] &&
                    <div className="py-2 text-red-500 text-xs">{errors[field]["message"]}</div>
                  }
                </div>
              );
            })}
          </div>
          <AddressForm register={register()} address={user.address} />
          <button className="mt-5" type="submit">
            Update
          </button>
        </form>
      </Section>
    </Layout>
  );
};

export default ProfileEdit;
