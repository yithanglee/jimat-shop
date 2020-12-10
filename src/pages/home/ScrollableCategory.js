import React from 'react';
import Scrollable, { ScrollableItem } from 'components/scrollable';
import { CATEGORIES } from 'config';

const ScrollableCategory = props => {
  return (
    <Scrollable>
      {CATEGORIES.map((item, index) => (
        <ScrollableItem width="165px" key={index}>
          <div
            className="category"
            onClick={() => {
              props.history.push(`/category/${item.name}`);
            }}
          >
            <img src={item.url} alt={item.name} />
            <p className="text text-sm font-bold leading-4 text-white">
              {item.name}
            </p>
          </div>
        </ScrollableItem>
      ))}
    </Scrollable>
  );
};

export default ScrollableCategory;
