/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';

// project imports
import Loader from 'components/ui-component/Loader';

import { BACKEND_PATH } from 'config';
import axiosInstance from './axios';
import axios, { Axios } from 'axios';

const setProduct = async (form_data) => {
  const response = await axiosInstance
    .post(`${BACKEND_PATH}/api/v1/inventory/`, form_data)
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const getAllListing = async (user_name) => {
  const respond = await axios.get(`${BACKEND_PATH}/api/v1/profile/${user_name}`).then((res) => {
    return res.data;
  });
  return respond;
};

const getListingById = async (id) => {
  const respond = await axios
    .get(`${BACKEND_PATH}/api/v1/inventory/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const stringErr = JSON.stringify(err);
      const error = JSON.parse(stringErr);
      if (error?.status == 404) location?.replace('/not-found');
    });

  return respond;
};

const getLisitingAgentById = async (id) => {
  const respond = await axios.get(`${BACKEND_PATH}/api/v1/profile/${id}`).then((res) => {
    return res.data;
  });

  return respond;
};

const getProfileAgentById = async (uid) => {
  return await axios
    .get(`${BACKEND_PATH}/api/v1/profile/${uid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const stringErr = JSON.stringify(err);
      const error = JSON.parse(stringErr);
      return error;
    });
};

const getAllProfileAgent = async () => {
  try {
    const res = await axios.get(`${BACKEND_PATH}/api/v1/profile/`);
    return res;
  } catch (err) {
    const stringErr = JSON.stringify(err);
    const error = JSON.parse(stringErr);
    return error;
  }
};
const getListingBySlug = async (slug) => {
  await axios
    .get(`${BACKEND_PATH}/api/v1/profile/${uid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const stringErr = JSON.stringify(err);
      const error = JSON.parse(stringErr);
      return error;
    });
};

const updateListingById = async (id, form_data) => {
  const response = await axiosInstance
    .put(`${BACKEND_PATH}/api/v1/inventory/${id}`, form_data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const stringErr = JSON.stringify(err);
      const error = JSON.parse(stringErr);
      return error;
    });
  return response;
};

const deletePhotoListingById = async (id, photo_id) => {
  const response = await axiosInstance
    .patch(`${BACKEND_PATH}/api/v1/inventory/${id}`, photo_id)
    .then((res) => {
      v;
      return res;
    })
    .catch((err) => {
      const stringErr = JSON.stringify(err);
      const error = JSON.parse(stringErr);
      return error;
    });
  return response;
};

const deleteListingById = async (id) => {
  await axiosInstance
    .delete(`${BACKEND_PATH}/api/v1/inventory/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const stringErr = JSON.stringify(err);
      const error = JSON.parse(stringErr);
      return error;
    });
};

export {
  setProduct,
  getAllListing,
  getListingById,
  getLisitingAgentById,
  getProfileAgentById,
  getListingBySlug,
  updateListingById,
  deletePhotoListingById,
  deleteListingById,
  getAllProfileAgent
};
