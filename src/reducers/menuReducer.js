import { CREATE_MENU, DELETE_MENU, ADD_MENU, UPDATE_MENU, REMOVE_MENU } from '../actions/types';
export default function (state = {}, action) {
  let id
  let menus
  switch (action.type) {
    case CREATE_MENU:
      id = action.payload
      return {
        ...state,
        [id]: []
      }
    case DELETE_MENU:
      let newState = {...state}
      id = action.payload
      delete newState[id]
      return newState
    case ADD_MENU:
      id = action.payload.id
      menus = [...state[id]]
      menus.splice(action.payload.index, 0, action.payload.menuRow)
      return { ...state, [id]: menus}
    case UPDATE_MENU:
      id = action.payload.id
      menus = [...state[id]]
      menus.splice(action.payload.index, 1, action.payload.menuRow)
      return { ...state, [id]: menus}
    case REMOVE_MENU:
      id = action.payload.id
      menus = [...state[id]]
      menus.splice(action.payload.index, 1)
      return { ...state, [id]: menus}
    default:
      return state;
  }
}
