import React from 'react';
import Button from 'components/Button';
import Modal from 'components/Modal';
import WarningImg from 'img/warning.png';

const WarningModal = props => (
  <Modal in={props.isShow}>
    <img src={WarningImg} alt="warning logo" width="90%" />
    <p className="text-xl leading-5 font-bold font-medium text-blue-900 mb-2">
      Your already have items from other outlets
    </p>
    <p className="text-sm leading-4 text-gray-500">
      You can keep adding items from the previous outlet, or clear your cart and
      start adding items from this new outlet
    </p>
    <br />
    <div className="button-group">
      <Button size="small" onClick={props.onCancel}>
        Cancel
      </Button>
      <Button border size="small" onClick={props.onOk}>
        Clean My Cart, and Continue
      </Button>
    </div>
  </Modal>
);

export default WarningModal;
