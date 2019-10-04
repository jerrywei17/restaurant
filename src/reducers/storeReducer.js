import { ADD_STORE, DELETE_STORE } from '../actions/types';
let uuid = 0
export default function (state = {storeList: []}, action) {
  switch (action.type) {
    case ADD_STORE:
      const store = action.payload;
      return { ...state, storeList: [...state.storeList, { ...store, id: uuid++ }] };
    case DELETE_STORE:
      const id = action.payload;
      let index = state.storeList.findIndex(s => s.id === id)
      if(index!==-1){
        state.storeList.splice(index, 1)
      }
      return { ...state, storeList: [...state.storeList]};
    default:
      return state;
  }
}
