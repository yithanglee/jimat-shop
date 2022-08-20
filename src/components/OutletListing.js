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

const OutletListing = ({ outlet, comingSoon }) => {
  const credit_enabled_outlet = useSelector(
    state => state.auth.user.credit_enabled_outlet
  );
  return (
    <div className={clsx(`bg-white outlet shadow-lg hover:shadow-md rounded-md`, comingSoon ? 'coming-soon' : '')}>
      <div className="flex min-h-full h-full">
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
            <div className="content grid grid-rows-4 gap-0 h-full">
              <p className="text-md leading-5 font-bold text-black mb-1">
                {outlet.name}
              </p>
              <p className="row-span-2 text-sm leading-6 text-gray-400">
                {outlet.address}
              </p>
              {comingSoon ? (
                <div>
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium leading-5 bg-gray-300 text-white">
                    Coming Soon
                  </span>
                </div>
              ): (
                <div className="flex-shrink-1 flex-grow-1">
                  {outlet.status === 'active' && (
                    <div className="block h-full">
                      <span 
                        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium leading-5 bg-indigo-600 text-white">
                        View Products
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </OutletNavigator>
        </div>       
      </div>
    </div>
  );
};

export default OutletListing;
