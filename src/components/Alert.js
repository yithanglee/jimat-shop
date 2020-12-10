import React from 'react';
import { Transition } from 'react-transition-group';

import 'style/alert.scss';

const defaultStyle = {
  transition: `all 600ms ease-in-out`,
  transform: 'translateY(-150%);',
};

const transitionStyles = {
  entering: { transform: 'translateY(15%)' },
  entered: { transform: 'translateY(15%)' },
  exiting: { transform: 'translateY(-150%)' },
  exited: { transform: 'translateY(-150%)' },
};

const Alert = props => {
  const { content, type } = props;
  const color = (type => {
    if (type === 'notification') {
      return 'green';
    } else if (type === 'error') {
      return 'red';
    } else {
      return 'blue';
    }
  })(type);
  return (
    <Transition in={props.in} timeout={300}>
      {state => {
        return (
          <div
            className={`rounded-md bg-${color}-100 p-4 alert`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {content && (
              <div className="flex">
                <div>
                  <p
                    className={`text-sm leading-5 font-medium text-${color}-800`}
                  >
                    {content.header}
                  </p>
                  <p className={`text-sm leading-5 text-${color}-700`}>
                    {content.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Transition>
  );
};

export default Alert;
