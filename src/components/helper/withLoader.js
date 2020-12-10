import React from 'react';
import ContentLoader from 'components/ContentLoader';

const withLoader = (Component, loaderSettings) => {
  return props => {
    if (props.isLoading) {
      return (
        <ContentLoader
          height={loaderSettings.height}
          background={loaderSettings.bgColor}
        />
      );
    } else {
      return <Component {...props} />;
    }
  };
};

export default withLoader;
