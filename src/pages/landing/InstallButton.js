import React, { useState, useEffect } from 'react';

const InstallButton = () => {
  const [deferredPrompt, updateDeferredPrompt] = useState(null);
  const [isVisible, toggleVisibility] = useState(false);

  const handleClick = e => {
    toggleVisibility(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        updateDeferredPrompt(null);
      });
    } else {
      console.log('deferredPrompt not found');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      updateDeferredPrompt(e);
      toggleVisibility(true);
    });
  }, []);

  return (
    <div className="container">
      {isVisible && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              Dapatkan App JiMATSHOP Sekarang
              <span className="italic text-gray-700">
                &nbsp;/ Experience JiMATSHOP App Now
              </span>
            </h3>
            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
              <div className="max-w-xl text-sm font-medium leading-5 text-gray-900">
                <p>
                  Easy way to get attractive offers and meaningful rewards.
                </p>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={e => handleClick(e)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  >
                    Install
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallButton;
