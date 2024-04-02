import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ALL_USERS
} from '../actions/types';

const initialState = {
  token: window.localStorage.getItem('token'),
  isAuth: null,
  isLoading: false,
  user: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      window.localStorage.setItem('token', action.payload.token);
      return {
        ...action.payload,
        isAuth: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      window.localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null,
        isLoading: false
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
