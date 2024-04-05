import { GET_USER, ADD_USER, DELETE_USER, UPDATE_USER } from './types';
import { tokenconfig } from './authactions';
import { returnErrors } from './erroractions';
import api from '../utils/api';

export const getUser = () => (dispatch) => {
  api
    .get('/api/auth/users')
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteUser = (id) => (dispatch, getState) => {
  api
    .delete(`/api/auth/${id}`, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateUser = (id, user) => (dispatch, getState) => {
  api
    .put(`/api/auth/${id}`, user, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
