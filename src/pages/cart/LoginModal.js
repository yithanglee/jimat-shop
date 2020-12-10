import React from 'react';
import Modal from 'components/Modal';
import LoginImg from 'img/login.png';
import GoogleAuth from 'components/GoogleAuth';
import Button from 'components/Button';

const LoginModal = ({ isModalOpen, toggleModal }) => {
  return (
    <Modal in={isModalOpen}>
      <div className="sign-in-wrapper">
        <img src={LoginImg} alt="Login Img" width="90%" />
        <div className="modal-text">
          <p className="text-xl leading-5 font-bold  text-blue-900">
            Login Now
          </p>
          <p className="text-sm text-gray-600">
            You need to login to make an order.
          </p>
        </div>
        <div className="button-group">
          <Button border onClick={toggleModal}>
            Let's Me think again.
          </Button>
          <GoogleAuth
            onSuccessCallback={() => {
              window.location.reload();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
