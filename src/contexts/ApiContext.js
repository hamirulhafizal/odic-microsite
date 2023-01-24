/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/ui-component/Loader';
import axios from 'utils/axios';

import { BACKEND_PATH } from 'config';
import axiosInstance from './axios';

//next
import { useRouter } from 'next/router';
import user from 'store/slices/user';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const history = useRouter();

  useEffect(() => {
    if (state.user == null) init();
  }, [state.user]);

  const init = () => {
    try {
      const serviceToken = window.localStorage.getItem('access');
      if (serviceToken) {
        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
          const localUsers = window.localStorage.getItem('users');
          let users = JSON.parse(localUsers);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: users
            }
          });
        }
      } else {
        dispatch({
          type: LOGOUT
        });
      }
    } catch (err) {
      dispatch({
        type: LOGOUT
      });
    }
  };

  const login = async (email, password) => {
    const response = await axiosInstance
      .post(`${BACKEND_PATH}/api/v1/user/login`, {
        email,
        password
      })
      .then(async (res) => {
        if (typeof window !== 'undefined') {
          axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access');
          localStorage.setItem('access', res?.data?.access);
          localStorage.setItem('refresh', res?.data?.refresh);
        }

        await getProfile(res?.data?.user_name);

        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true
          }
        });

        history.push('/listing');

        return res;
      });

    return response;
  };

  const register = async (email, password, first_name, last_name) => {
    // todo: this flow need to be recode as it not verified\
    const user_name = first_name + last_name;

    const respond = await axios
      .post(`${BACKEND_PATH}/api/v1/user/register`, {
        email,
        user_name,
        first_name,
        password
      })
      .then((res) => {
        login(email, password, user_name);
        updateProfile(user_name, { firstName: first_name, lastName: last_name });
        history.push('/login');

        return res;
      })
      .catch((err) => {
        history.push('/register');
        return err;
      });
    return respond;
  };

  const logout = async () => {
    // const response = await axiosInstance.post(`${BACKEND_PATH}/api/v1/user/logout`)
    // .then((res) => {
    //   history.push('/login');
    //   return res;
    // });

    // let off = response.data;

    dispatch({ type: LOGOUT });

    window.localStorage.removeItem('access');
    window.localStorage.removeItem('refresh');
    window.localStorage.removeItem('users');
  };

  const resetPassword = (email) => console.log(email);

  const getProfile = async (user_name) => {
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access');
    const response = await axiosInstance.get(`${BACKEND_PATH}/api/v1/profile/${user_name}`).then((res) => {
      if (typeof window !== 'undefined') {
        const users = JSON.stringify(res.data);
        localStorage.setItem('users', users);

        dispatch({
          payload: {
            isLoggedIn: true,
            user: users
          }
        });

        init();
      }

      return res;
    });
  };

  const updateProfile = async (user_name, formData) => {
    const response = await axiosInstance.patch(`${BACKEND_PATH}/api/v1/profile/${user_name}`, formData).then((res) => {
      if (typeof window !== 'undefined') {
        const users = JSON.stringify(res.data);
        localStorage.setItem('users', users);

        dispatch({
          payload: {
            isLoggedIn: true,
            user: users
          }
        });

        init();
      }
      return res;
    });
    return response;
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <ApiContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, getProfile }}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node
};

export default ApiContext;
