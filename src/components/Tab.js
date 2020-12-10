import React from 'react';

import Scrollable, { ScrollableItem } from 'components/scrollable';
import 'style/tab.scss';

const Tab = props => {
  return (
    <div className="tab-list">
      <Scrollable>
        {props.categories.map(item => {
          return (
            <ScrollableItem key={item.id}>
              <div className="py-2">
                <div
                  className={`tab bg-white rounded-lg shadow-md hover:cursor-pointer hover:shadow transition duration-300 ease-in-out ${props.selected ===
                    item.id && 'bg-blue-900 text-white'}`}
                  onClick={() => {
                    props.onChange(item.id);
                  }}
                >
                  {item.name}
                </div>
              </div>
            </ScrollableItem>
          );
        })}
      </Scrollable>
    </div>
  );
};

export default Tab;
