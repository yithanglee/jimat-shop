import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

import SubHeader from 'components/header';
import Tab from 'components/Tab';
import Section from 'components/section';
import Layout from 'components/Layout';
import WarningModal from './WarningModal';
import StocksListing from './StocksListing';
import OutletDetails from './OutletDetails';

import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from 'redux/slices/carts';
import { clearSearchTarget } from 'redux/slices/search';
import api from 'utils/api';

import 'style/outlet.scss';

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
        bySupplierId: {},
      };
    case 'FETCH_STOCKS_SUCCESS':
      return {
        ...state,
        bySupplierId: {
          ...state.bySupplierId,
          [action.payload.id]: action.payload.stocks,
        },
      };
    case 'FETCH_STOCKS_FAILURE':
    default:
      return state;
  }
}

const Outlet = props => {
  const initialState = {
    selectedCategory: '',
    bySupplierId: {},
  };
  const [stocks, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const { id } = useParams();

  const searchResult = useSelector(state =>
    !!state.search ? state.search.supplier.name : ''
  );

  const carts = useSelector(state => state.carts);
  const credit_enabled_outlet = useSelector(
    state => state.auth.user.credit_enabled_outlet
  );
  const [selectedSupplier, changeSupplier] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [isModalOpen, toggleModal] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  const currentStocks = useMemo(() => {
    return stocks.bySupplierId[selectedSupplier] || [];
  }, [stocks.bySupplierId, selectedSupplier]);

  const categories = useMemo(() => {
    return allCategories.length > 0
      ? allCategories.map(each => ({
          id: each.id,
          name: each.name,
        }))
      : [];
  }, [allCategories]);

  const suppliers = useMemo(() => {
    if (allCategories.length > 0) {
      const index = allCategories.findIndex(
        each => each.id === stocks.selectedCategory
      );
      if (index > -1) {
        return allCategories[index].suppliers;
      }
    }

    return [];
  }, [allCategories, stocks.selectedCategory]);

  const params = queryString.parse(props.location.search);

  useEffect(() => {
    if (stocks.selectedCategory === '' && categories.length > 0) {
      localDispatch({
        type: 'CHANGE_CATEGORY',
        payload: {
          selectedCategory: categories[0].id,
        },
      });
    }
  }, [stocks.selectedCategory, categories]);

  useEffect(() => {
    if (selectedSupplier === '' && suppliers.length > 0) {
      if (searchResult !== '') {
        const supplier = suppliers.find(each => each.name === searchResult);
      
        if (supplier) changeSupplier(supplier.id);
        dispatch(clearSearchTarget());
      } else {
        changeSupplier(suppliers[0].id);
      }
    }
  }, [dispatch, searchResult, selectedSupplier, suppliers]);

  useEffect(() => {
    async function fetchSuppliersByOutlet(outletId) {
      try {
        const response = await api.GET(`/outlets/${outletId}/categories`);
        setAllCategories(response.data.items);
      } catch (e) {
        console.error(e);
      }
    }

    fetchSuppliersByOutlet(id);
  }, [id]);

  useEffect(() => {
    async function fetchStocksBySupplier() {
      try {
        const response = await api.GET(
          `/outlets/${id}/category/${stocks.selectedCategory}/suppliers/${selectedSupplier}/stocks`
        );
        let emptyStockItems = response.data.items.filter(
          item => item.quantity_in_stock === 0
        );

        let fullStockItems = response.data.items.filter(
          item => item.quantity_in_stock > 0
        );
        localDispatch({
          type: 'FETCH_STOCKS_SUCCESS',
          payload: {
            id: selectedSupplier,
            stocks: [...fullStockItems, ...emptyStockItems],
          },
        });
      } catch (e) {
        localDispatch({
          type: 'FETCH_STOCKS_FAILURE',
          payload: e,
        });
      }
    }

    if (selectedSupplier) {
      fetchStocksBySupplier();
    }
  }, [id, selectedSupplier, stocks.selectedCategory]);

  const addItem = item => {
    if (carts.cartOutlet && carts.cartOutlet !== id) {
      toggleModal(true);
      setSelectedItem(item);
      return;
    }
    dispatch(addItemToCart({ item, outletId: id }));
  };

  const removeItem = item => {
    dispatch(removeItemFromCart(item));
  };

  const onOk = () => {
    dispatch(clearCart());
    dispatch(addItemToCart({ item: selectedItem, outletId: id }));

    toggleModal(!isModalOpen);
  };

  const onCancel = () => {
    toggleModal(!isModalOpen);
  };

  return (
    <Layout>
      <SubHeader withCart>
        <OutletDetails
          id={id}
          map_url={params.map_url}
          name={params.name}
          address={params.address}
        />
      </SubHeader>
      {credit_enabled_outlet[id] && (
        <div
          className="bg-yellow-100 rounded-b text-blue-700 px-4 py-3"
          role="alert"
        >
          <div>
            <p className="font-bold">Good News!</p>
            <p className="text-sm">
              You have {credit_enabled_outlet[id]} voucher for this outlet.
            </p>
          </div>
        </div>
      )}

      <Section padding="none">
        <WarningModal isShow={isModalOpen} onOk={onOk} onCancel={onCancel} />
      </Section>
      <Section padding="vertical">
        <Tab
          categories={categories}
          selected={stocks.selectedCategory}
          onChange={item => {
            localDispatch({
              type: 'CHANGE_CATEGORY',
              payload: { selectedCategory: item },
            });
            changeSupplier('');
          }}
        />

        <Tab
          categories={suppliers}
          selected={selectedSupplier}
          onChange={changeSupplier}
        />
      </Section>
      <Section padding>
        <StocksListing
          isLoading={currentStocks.length === 0}
          stocks={currentStocks}
          addItem={addItem}
          removeItem={removeItem}
          outletId={id}
        />
      </Section>
    </Layout>
  );
};

export default Outlet;
