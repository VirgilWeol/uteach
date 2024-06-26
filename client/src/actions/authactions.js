import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

import { returnErrors } from './erroractions';
import api from '../utils/api';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  api
    .get('/api/auth/user', tokenconfig(getState))
    .then((res) => {
      const role = res.data.role === 'admin' ? 'admin' : 'student';

      const user = {
        ...res.data,
        activeRole: role
      };
      dispatch({ type: USER_LOADED, payload: user });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const changeRole = (role) => (dispatch, getState) => {
  const user = getState().auth.user;
  user.activeRole = role;
  dispatch({ type: USER_LOADED, payload: user });
};

export const register =
  ({ email, name, phone, age, password, address }) =>
  (dispatch) => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    api
      .post(
        '/api/users',
        { name, email, phone, age, password, address },
        config
      )
      .then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        window.location.reload();
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    api
      .post('/api/auth/authuser', { email, password }, config)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

export const editProfile = (user) => (dispatch, getState) => {
  api
    .put(`/api/auth/${user._id}`, user, tokenconfig(getState))
    .then((res) => dispatch({ type: 'EDIT_PROFILE', payload: res.data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenconfig = (getState) => {
  const tok = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (tok) {
    config.headers['x-auth-token'] = tok;
  }
  return config;
};

export const getAllUsers = () => (dispatch, getState) => {
  api
    .get('/api/auth/users', tokenconfig(getState))
    .then((res) => {
      dispatch({ type: 'GET_ALL_USERS', payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
