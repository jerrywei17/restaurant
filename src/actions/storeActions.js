import { CREATE_STORE, DELETE_STORE, CREATE_MENU, DELETE_MENU } from './types'
let uuid = 0
export const addStore = store => dispatch => {
  let date = new Date()
  let id = `${uuid++}`
  dispatch({ type: CREATE_STORE, payload: {...store, id, createdAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`} });
  dispatch({ type: CREATE_MENU, payload: id })
};

export const deleteStore = id => dispatch => {
  dispatch({ type: DELETE_STORE, payload: id })
  dispatch({ type: DELETE_MENU, payload: id })
};
