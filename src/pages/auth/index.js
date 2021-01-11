import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login_with_token } from 'redux/slices/auth';
import { default as SubHeader } from 'components/header';
import Layout from 'components/Layout';

const AuthorizationWithToken = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [tokenized] = React.useState(token);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  }
  const handlePassChange = (event) => {
    setPassword(event.currentTarget.value);
  }
  const handleSubmit = () => {
    dispatch(login_with_token({ email, password, token: tokenized }))
      .then(() => history.push(`/`))
  };

  const isEnabled = () => token !== '' && email !== '' && password !== ''

  return (
    <Layout>
      <SubHeader>
        <p className="header-title">
          <span role="img" aria-label="fire">
            🔥
          </span>
          Session with Token
        </p>
        <p className="header-description">Limited Time.</p>
      </SubHeader>
      <div className="grid grid-rows-1 m-20 pb-10 mx-auto w-2/3 md:w-1/3 bg-white rounded shadow-md">
        <div className="navbar sm:col-span-2 p-4 bg-gray-400 text-white rounded-t font-bold">
          Session with Token
        </div>
        <div className="sm:col-span-2 pt-8 pb-0 px-10">
          <label
            htmlFor="postcode"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Email
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input 
              type="text" 
              className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" 
              onChange={handleEmailChange} 
            />
          </div>
        </div>
        <div className="sm:col-span-2 py-4 pb-0 px-10">
          <label
            htmlFor="postcode"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input 
              type="password" 
              className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" 
              onChange={handlePassChange} 
            />
          </div>
        </div>
        <div className="sm:col-span-2 pt-8 pb-0 px-10">
          <div className="mt-1 rounded-md shadow-sm">
            <button
              type="button"
              onClick={e => handleSubmit()}
              disabled={!isEnabled()}
              className="inline-block items-center px-4 py-3 border border-transparent 
              text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 
              focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo 
              active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorizationWithToken;
