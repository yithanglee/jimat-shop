import React from 'react';
import 'style/content-loader.scss';

const ContentLoader = ({ height, width, background }) => {
  return (
    <div
      className="content-loader"
      style={{
        height: height + 'px',
        width: width + 'px',
        background: background || '#eceff1',
      }}
    >
      <div className="dots-group">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
};

export default ContentLoader;
