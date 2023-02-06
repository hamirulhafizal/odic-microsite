// third-party
import { createSlice } from '@reduxjs/toolkit';
import { getListingById, getListsbyQuery, updateListingById } from 'contexts/ApiListing';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  products: [],
  product: null,
  relatedProducts: [],
  reviews: [],
  addresses: [],
  slot: [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 }
  ]
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET PRODUCTS ALL
    getProductsSuccess(state, action) {
      state.products = action.payload;
    },

    // GET PRODUCT BY ID
    getProductSuccess(state, action) {
      state.product = action.payload;
    },
    // EDIT ADDRESS
    editProductSuccess(state, action) {
      state.addresses = action.payload;
    },

    // FILTER PRODUCTS
    filterProductsSuccess(state, action) {
      state.products = action.payload;
    },

    // GET RELATED PRODUCTS
    getRelatedProductsSuccess(state, action) {
      state.relatedProducts = action.payload;
    },

    // GET PRODUCT REVIEWS
    getProductReviewsSuccess(state, action) {
      state.reviews = action.payload;
    },

    // GET ADDRESSES
    getAddressesSuccess(state, action) {
      state.addresses = action.payload;
    },

    // ADD ADDRESS
    addAddressSuccess(state, action) {
      state.addresses = action.payload;
    },

    // EDIT ADDRESS
    editAddressSuccess(state, action) {
      state.addresses = action.payload;
    },

    // GET SLOT
    getSlot(state, action) {
      state.slot = action.payload;
      // state.slot.push(action.payload);
    }
  }
});

// Reducer
export default slice.reducer;

export const {
  getProductsSuccess,
  getProductSuccess,
  editProductSuccess,
  filterProductsSuccess,
  getRelatedProductsSuccess,
  getProductReviewsSuccess,
  getAddressesSuccess,
  addAddressSuccess,
  editAddressSuccess,
  getSlot
} = slice.actions;

// ----------------------------------------------------------------------ƒ

export function getProducts(user_name, data) {
  return async (dispatch) => {
    try {
      const response = getListsbyQuery({ username: user_name }, 1).then((res) => {
        dispatch(slice.actions.getProductsSuccess(res.results));
      });
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductById(id, data) {
  return async (dispatch) => {
    try {
      if (id !== null) {
        const response = getListingById(id).then((res) => {
          dispatch(slice.actions.getProductSuccess(res));
        });
        return response;
      }
      dispatch(slice.actions.getProductSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function editProductById(id, formData) {
  return async (dispatch) => {
    try {
      const response = updateListingById(id, formData).then((res) => {
        dispatch(slice.actions.editProductSuccess(res));
      });
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function filterProducts(filter) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/product/filter', { filter });
      dispatch(slice.actions.filterProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelatedProducts(query, data) {
  return async (dispatch) => {
    try {
      const response = data.filter((object) => {
        return object.id !== Number(query);
      });

      dispatch(slice.actions.getRelatedProductsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductReviews() {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/review/list');
      dispatch(slice.actions.getProductReviewsSuccess(response.data.productReviews));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAddresses() {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/address/list');
      dispatch(slice.actions.getAddressesSuccess(response.data.address));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addAddress(address) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/address/new', address);
      dispatch(slice.actions.addAddressSuccess(response.data.address));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editAddress(address) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/address/edit', address);
      dispatch(slice.actions.editAddressSuccess(response.data.address));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSlotById(id) {
  return async (dispatch) => {
    try {
      // const response = await axios.post('/api/address/edit', id);
      dispatch(slice.actions.getSlot(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
