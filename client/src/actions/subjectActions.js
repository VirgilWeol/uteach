import {
  GET_SUBJECT,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  SUBJECT_LOADING
} from './types';
import { tokenconfig } from './authactions';
import { returnErrors } from './erroractions';
import api from '../utils/api';

export const getSubject = () => (dispatch) => {
  dispatch(subjectLoading());
  api
    .get('/api/subjects')
    .then((res) =>
      dispatch({
        type: GET_SUBJECT,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteSubject = (_id) => (dispatch, getState) => {
  api
    .delete(`/api/subjects/${_id}`, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_SUBJECT,
        payload: _id
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addSubject = (subject) => (dispatch, getState) => {
  dispatch(subjectLoading());
  api
    .post('/api/subjects', subject, tokenconfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_SUBJECT,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const subjectLoading = () => {
  return {
    type: SUBJECT_LOADING
  };
};
