import React from 'react';
import { Transition } from 'react-transition-group';
import 'style/modal.scss';

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const Modal = props => {
  return (
    <div>
      <Transition
        in={props.in}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={100}
      >
        {state => {
          return (
            <div
              className="modal-background"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <div className="modal-wrapper">
                <div className="modal">{props.children}</div>
              </div>
            </div>
          );
        }}
      </Transition>
    </div>
  );
};

export default Modal;
