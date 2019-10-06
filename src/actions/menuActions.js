import { ADD_MENU, UPDATE_MENU, REMOVE_MENU } from './types'
export const addMenu = data => dispatch => {
  dispatch({ type: ADD_MENU, payload: data})
}

export const updateMenu = data => dispatch => {
  dispatch({ type: UPDATE_MENU, payload: data})
}

export const removeMenu = data => dispatch => {
  dispatch({ type: REMOVE_MENU, payload: data})
}
