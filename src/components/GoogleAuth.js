import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';

import config from 'config';
import { login, googleOAuthSuccess } from 'redux/slices/auth';
import { catchError } from 'redux/slices/error';

const GoogleAuth = props => {
  const dispatch = useDispatch();

  const renderComponent = renderProps => {
    return props.children ? (
      <div className="cursor-pointer text-center"onClick={renderProps.onClick} disabled={renderProps.disabled}>
        {props.children}
      </div>
    ) : (
      <span
        className="rounded-md shadow flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-900 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
      >
        {props.text || 'Sign In With Google Now'}
      </span>
    );
  };

  const onGoogleAuthSuccess = response => {
    try {
      const { tokenId, profileObj } = response;
      if (tokenId === undefined) {
        throw new Error('Google Token IDs is undefined');
      }
      dispatch(googleOAuthSuccess({ id_token: tokenId }));
      dispatch(login({ id_token: tokenId, ...profileObj })).then(() => {
        if (props.onSuccessCallback) {
          props.onSuccessCallback();
        }
      });
    } catch (err) {
      dispatch(
        catchError({
          header: 'Authentication Failed',
          message: err.message,
        })
      );
    }
  };

  // TODO: error handling for google auth
  const onGoogleAuthFailure = response => {
    dispatch(
      catchError({
        header: 'Google Authentication Failed',
        message: response.error,
      })
    );
  };

  return (
    <GoogleLogin
      clientId={config.GOOGLE_CLIENT_ID}
      onSuccess={onGoogleAuthSuccess}
      onFailure={onGoogleAuthFailure}
      cookiePolicy={'single_host_origin'}
      render={renderComponent}
    />
  );
};

export default GoogleAuth;
