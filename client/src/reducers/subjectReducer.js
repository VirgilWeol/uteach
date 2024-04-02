import uuid from 'uuid';
import {
  GET_SUBJECT,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  SUBJECT_LOADING,
  UPDATE_SUBJECT
} from '../actions/types';

const initialState = {
  subjects: [{ id: uuid(), name: 'loading' }]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECT:
      return {
        ...state,
        subjects: action.payload,
        loading: false
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(
          (subject) => subject._id !== action.payload
        )
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: [action.payload, ...state.subjects],
        loading: false
      };
    case SUBJECT_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        )
      };
    default:
      return {
        ...state
      };
  }
}
