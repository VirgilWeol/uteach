import uuid from 'uuid';
import { GET_USER, ADD_USER, DELETE_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  users: [{ id: uuid(), name: 'loading' }]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        )
      };
    default:
      return {
        ...state
      };
  }
}
