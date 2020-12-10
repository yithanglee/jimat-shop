import localforage from 'localforage';

const DATABASE_NAME = 'jimat';

const createStore = storeName =>
  localforage.createInstance({ name: DATABASE_NAME, storeName });

const jimatDB = {
  carts: createStore('carts'),
  orders: createStore('orders'),
};

export default jimatDB;
