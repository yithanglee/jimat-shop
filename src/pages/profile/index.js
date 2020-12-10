import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActiveVoucher from './ActiveVoucher.js';

import { fetchProfile, logout } from 'redux/slices/auth';
import AuthBanner from 'components/AuthBanner';
import Section from 'components/section';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import withLoader from 'components/helper/withLoader';
import { default as SubHeader } from 'components/header';

import 'style/profile.scss';

const Wishlist = () => <Icon type="star" stroke="#fff" />;
const FavouriteOutlet = () => <Icon type="heart" stroke="#fff" />;
const TNC = () => <Icon type="file" stroke="#fff" />;
const Policy = () => <Icon type="paper" stroke="#fff" />;
const Info = () => <Icon type="info" stroke="#fff" />;

const ProfilePlaceholder = () => {
  return (
    <svg
      className="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
};

const BadgeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="inline-block w-14 h-14"
    >
      <path d="M97.103 300.138h317.793v-88.276H97.103v88.276z" fill="#354577" />
      <g fill="#172644">
        <path d="M97.103 300.138v-52.966H0l35.31 44.138L0 335.448h123.586v-35.31H97.103zM512 247.172h-97.103v52.966h-26.483v35.31H512l-35.31-44.138L512 247.172z" />
      </g>
      <g fill="#f8d832">
        <path d="M388.154 211.862c4.714-23.181 7.83-46.769 9.084-70.621L255.996 52.966l-141.241 88.276c1.262 23.852 4.378 47.439 9.092 70.621h264.307zM150.722 300.138c20.224 48.914 48.472 94.517 83.986 134.771L256 459.034l21.292-24.126c35.513-40.254 63.762-85.857 83.986-134.771H150.722z" />
      </g>
      <g fill="#c4a316">
        <path d="M352.085 211.862a445.634 445.634 0 008.342-51.994l-104.43-65.262-104.421 65.262a445.566 445.566 0 008.342 51.994h192.167zM189.346 300.138c17.152 37.914 39.503 73.507 66.657 105.419 27.154-31.912 49.496-67.505 66.657-105.419H189.346z" />
      </g>
    </svg>
  );
};

const tabs = [
  {
    icon: FavouriteOutlet,
    link: '/wishlist',
    name: 'Wishlist Items',
    requiredLogin: true,
  },
  {
    icon: Wishlist,
    link: '/favourite-outlet',
    name: 'Favourite Outlets',
    requiredLogin: true,
  },
  {
    icon: TNC,
    link: '/terms',
    name: 'Terms and Conditions',
    requiredLogin: false,
  },
  {
    icon: Policy,
    link: '/policy',
    name: 'Privacy Policy',
    requiredLogin: false,
  },
  {
    icon: Info,
    link: '/',
    name: 'More about Jimat',
    requiredLogin: false,
  },
];

const MemberVerification = ({ hasNotification, setNotification, memberships }) => {
  const membership = memberships.find((m) => m.membership_email_sent && !m.verified)
  const handleClick = () => setNotification(false)

  return hasNotification
    ? (
      <div className="bg-blue-900 rounded-lg text-white flex flex-col flex-wrap text-center items-center justify-center mx-auto w-full md:w-8/12 p-4 relative mb-6">
        <span 
          className="absolute text-2xl text-white object-right-top top-0 right-0 mx-2 cursor-pointer" 
          onClick={handleClick}>&times;</span>
        <div className="text-3xl font-bold">
          Congratulations!
        </div>
        <div className="text-md text-grey-500 pt-2">
          {`You have been identified as part of ${membership?.koop_name || 'ANGKASA'}. Email verification
          has been sent to your work email.`}
        </div>
        <div className="text-xl font-bold py-2">
          Verify now to enjoy your JiMATSHOP voucher!
        </div>
      </div>
    )
    : null
}

const Profile = withLoader(
  ({ user, hasNotification, setNotification }) => {
    return (
      <div className="block p-4 relative">
        <NavLink
          exact
          to="/profile/edit"
          className="absolute top-0 right-3 inline-flex items-center px-4 py-1 rounded-full text-sm font-medium leading-5 bg-purple-100 text-purple-800"
        >
          Edit
        </NavLink>
        <div className="text-center">
          <span className="inline-block relative ">
            <span className="inline-block h-40 w-40 rounded-full overflow-hidden bg-gray-100">
              <ProfilePlaceholder />
            </span>
            {user.verified && (
              <span className="absolute bottom-0 right-0 block">
                <BadgeIcon />
              </span>
            )}
          </span>
        </div>
        <div className="mt-3 mb-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user.name}
          </h3>
          <p className="text-sm leading-5 text-gray-500">{user.email}</p>
          {user.ic_number != null && (
            <p className="text-sm leading-5 text-gray-500">{user.ic_number}</p>
          )}
        </div>
        {hasNotification && (
            <MemberVerification 
              user={user}
              memberships={user.memberships}
              hasNotification={hasNotification} 
              setNotification={setNotification}
            />
          )
        }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-left">
          {
            user.memberships && user.memberships.map((membership, index) => {
              if (!membership.verified) return null;
              return (
                <ActiveVoucher
                  key={index}
                  role={membership.role}
                  id={membership.koop_id}
                  credit={membership.credit}
                  name={membership.koop_name}
                  outlet={membership.outlet_name}
                  color={index % 2 === 0 ? 'indigo' : 'teal'} />
              )
            }
            )}
        </div>
      </div>
    );
  },
  { height: '170' }
);

const User = props => {
  let [hasNotification, setNotification] = useState(false)
  const dispatch = useDispatch();
  const isSignIn = useSelector(state => state.auth.isUserLogin);
  const user = useSelector(state => {
    if (Object.entries(state.auth.user.jimat).length === 0) {
      return false;
    } else {
      return state.auth.user.jimat;
    }
  });

  const unverified = (user) => {
    if (!user) return

    if (user.memberships && user.memberships.length) {
      let membership = user.memberships.filter((member) => {
        return member.membership_email_sent === true && !member.verified
      })
      return membership.length > 0
    } else {
      return user.membership_email && !user.verified
    }
  }

  useEffect(() => {
    if (isSignIn) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isSignIn]);

  useLayoutEffect(() => {
    setNotification(unverified(user))
  }, [user])

  const isUserLoading = useSelector(state => state.auth.loading);

  const handleLogOut = () => {
    if (isSignIn) {
      dispatch(logout());
    }
  };

  return (
    <Layout>
      <SubHeader transparent />
      {isSignIn ? (
        <Profile 
          isLoading={isUserLoading} 
          hasNotification={hasNotification} 
          setNotification={setNotification}
          user={user} 
        />
      ) : (
          <Section>
            <AuthBanner />
          </Section>
        )}
      <Section>
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul>
            {tabs.map((tab, index) => {
              const ItemIcon = tab.icon;
              if (!tab.requiredLogin || tab.requiredLogin === isSignIn) {
                return (
                  <li className="border-gray-200" key={index}>
                    <div
                      onClick={() => props.history.push(tab.link)}
                      className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <span className="flex p-2 rounded-lg bg-gray-800">
                              <ItemIcon />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <p className="text-base leading-5 font-medium text-gray-600 truncate">
                              {tab.name}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Icon type="chevron-right" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </Section>
      {isSignIn && (
        <Section>
          <span onClick={handleLogOut} className="log-out-link">
            <div className="inline-block ">
              <button className="rounded text-md leading-5 font-bold font-medium text-red-700 py-5 px-10 hover:bg-red-50">
                Log Out
              </button>
            </div>
          </span>
        </Section>
      )}
    </Layout>
  );
};

export default User;
