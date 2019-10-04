import { ADD_STORE, DELETE_STORE } from './types'

export const addStore = store => dispatch => {
  dispatch({ type: ADD_STORE, payload: store });
};

export const deleteStore = id => dispatch => {
  dispatch({ type: DELETE_STORE, payload: id });
};
