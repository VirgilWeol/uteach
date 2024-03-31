import uuid from 'uuid';
import {
  GET_ORDER,
  ADD_ORDER,
  DELETE_ORDER,
  ORDER_LOADING,
  UPDATE_ORDER
} from '../actions/types';

const initialState = {
  orders: [{ id: uuid(), name: 'loading' }]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload)
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        loading: false
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false
      };
    case ORDER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return {
        ...state
      };
  }
}
