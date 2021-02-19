import React from 'react';
import clsx from 'clsx';
import 'style/layout.scss';

const Layout = props => {
  const Footer = props.footer;
  const isValid =
    props.content === undefined || (props.content && props.content.length > 0);
  return (
    <div className={clsx(
      `layout`,
      props.padding ? props.padding : '',
      props.background ? 'bg-'+props.background : '',
      props.klass ? props.klass : ''
    )}>
      <div className="min-h-screen">
        {isValid ? (
          props.children
        ) : (
          <div className="loading-screen">Loading...</div>
        )}
      </div>
      {Footer && (
        <div className="layout-footer bg-white">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
