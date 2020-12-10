import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import 'style/outlet-listing.scss';
import { NavLink } from 'react-router-dom';

const OutletNavigator = props => {
  if (props.comingSoon) {
    return props.children;
  } else {
    return (
      <NavLink
        to={`/outlet/${props.outlet.id}?name=${props.outlet.name}&address=${props.outlet.address}&map_url=${props.outlet.map_url}`}
      >
        {props.children}
      </NavLink>
    );
  }
};

const VoucherIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 512 512"
      className="inline-block mr-2"
    >
      <path
        d="M501.333 202.667c5.891 0 10.667-4.776 10.667-10.667v-85.333C512 100.776 507.224 96 501.333 96H10.667C4.776 96 0 100.776 0 106.667V192c0 5.891 4.776 10.667 10.667 10.667C40.122 202.667 64 226.545 64 256s-23.878 53.333-53.333 53.333C4.776 309.333 0 314.109 0 320v85.333C0 411.224 4.776 416 10.667 416h490.667c5.891 0 10.667-4.776 10.667-10.667V320c0-5.891-4.776-10.667-10.667-10.667C471.878 309.333 448 285.455 448 256s23.878-53.333 53.333-53.333z"
        fill="#ffc107"
      />
      <g fill="#fafafa">
        <path d="M138.667 288c-5.891 0-10.667-4.776-10.667-10.667v-42.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v42.667c-.001 5.891-4.776 10.667-10.667 10.667zM138.667 202.667c-5.891 0-10.667-4.776-10.667-10.667v-42.667c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667V192c-.001 5.891-4.776 10.667-10.667 10.667zM138.667 373.333c-5.891 0-10.667-4.776-10.667-10.667V320c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v42.667c-.001 5.891-4.776 10.666-10.667 10.666zM373.333 288c-5.891 0-10.667-4.776-10.667-10.667v-42.667c0-5.891 4.776-10.667 10.667-10.667S384 228.776 384 234.667v42.667c0 5.89-4.776 10.666-10.667 10.666zM373.333 202.667c-5.891 0-10.667-4.776-10.667-10.667v-42.667c0-5.891 4.776-10.667 10.667-10.667S384 143.442 384 149.333V192c0 5.891-4.776 10.667-10.667 10.667zM373.333 373.333c-5.891 0-10.667-4.776-10.667-10.667V320c0-5.891 4.776-10.667 10.667-10.667S384 314.109 384 320v42.667c0 5.891-4.776 10.666-10.667 10.666z" />
      </g>
    </svg>
  );
};

const NavigationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="25"
      height="25"
    >
      <path
        d="M507.607 4.395c-4.242-4.245-10.61-5.551-16.177-3.32l-482 192.798c-5.516 2.205-9.209 7.458-9.42 13.394-.211 5.936 3.101 11.438 8.444 14.029l190.067 92.182 92.182 190.068c2.514 5.184 7.764 8.454 13.493 8.454.178 0 .357-.003.536-.01 5.936-.211 11.188-3.904 13.394-9.419L510.928 20.573c2.228-5.571.922-11.935-3.321-16.178z"
        fill="#e2e8f0"
      />
      <path
        d="M507.607 4.395L198.522 313.477l92.182 190.068c2.514 5.184 7.764 8.454 13.493 8.454.178 0 .357-.003.536-.01 5.936-.211 11.188-3.904 13.394-9.419L510.928 20.573c2.228-5.571.922-11.935-3.321-16.178z"
        fill="#cbd5e0"
      />
    </svg>
  );
};

const OutletListing = ({ outlet, comingSoon }) => {
  const credit_enabled_outlet = useSelector(
    state => state.auth.user.credit_enabled_outlet
  );
  return (
    <div className={clsx(`bg-white outlet shadow-lg hover:shadow-md rounded-md`, comingSoon ? 'coming-soon' : '')}>
      <div className="flex justify-between items-center ">
        <div className="p-3 flex-grow-1 flex-shrink-1 w-full">
          <OutletNavigator outlet={outlet} comingSoon={comingSoon}>
            {credit_enabled_outlet[outlet.id] && (
              <div>
                <VoucherIcon />
                <span className="text-sm font-bold text-yellow-400">
                  Credit Available
                </span>
              </div>
            )}
            <div className="content ">
              <p className="text-md leading-5 font-bold text-black mb-1">
                {outlet.name}
              </p>
              <p className="text-sm leading-tight text-gray-400">
                {outlet.address}
              </p>
              {comingSoon && (
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-300 text-white">
                  Coming Soon
                </span>
              )}
            </div>
          </OutletNavigator>
        </div>
        {!comingSoon && (
          <div className="flex-shrink-1 flex-grow-1">
            {outlet.map_url && (
              <div className="p-4 block h-full">
                <a
                  href={outlet.map_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <NavigationIcon />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutletListing;
