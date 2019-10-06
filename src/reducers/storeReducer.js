import { CREATE_STORE, DELETE_STORE } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_STORE:
      const store = action.payload;
      return [ ...state, store];
    case DELETE_STORE:
      const id = action.payload;
      let index = state.findIndex(s => s.id === id)
      let stores = [...state]
      if(index!==-1){
        stores.splice(index, 1)
      }
      return stores;
    default:
      return state;
  }
}
