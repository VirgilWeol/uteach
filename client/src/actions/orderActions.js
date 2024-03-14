import { GET_ORDER, ADD_ORDER, DELETE_ORDER, ORDER_LOADING } from './types';
import { tokenconfig } from './authactions';
import { returnErrors } from './erroractions';
import api from '../utils/api';

export const getOrder = () => (dispatch) => {
  dispatch(setOrderLoading());
  api
    .get('/api/orders')
    .then((res) =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getOrderByStudentId = (studentId) => (dispatch) => {
  dispatch(setOrderLoading());
  api
    .get(`/api/orders/student/${studentId}`)
    .then((res) =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addOrder = (order) => (dispatch, getState) => {
  api
    .post('/api/orders', order, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteOrder = (id) => (dispatch, getState) => {
  api
    .delete(`/api/orders/${id}`, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ORDER,
        payload: id
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};
