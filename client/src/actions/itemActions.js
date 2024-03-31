import { GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEM_LOADING } from './types';
import { tokenconfig } from './authactions';
import { returnErrors } from './erroractions';
import api from '../utils/api';

export const getItem = () => (dispatch) => {
  dispatch(itemLoading());
  api
    .get('/api/items')
    .then((res) =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getItemBySubject = (subject) => (dispatch) => {
  dispatch(itemLoading());
  api
    .get(`/api/items/subject/${subject}`)
    .then((res) =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getItemByMentorId = (mentorId) => (dispatch) => {
  dispatch(itemLoading());
  api
    .get(`/api/items/mentor/${mentorId}`)
    .then((res) =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItem = (_id, status) => (dispatch, getState) => {
  api
    .put(`/api/items/${_id}`, { status }, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (_id) => (dispatch, getState) => {
  api
    .delete(`/api/items/${_id}`, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: _id
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch(itemLoading());
  api
    .post('/api/items', item, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const itemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};
