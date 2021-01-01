import {FETCH_CATEGORIES} from '../constants';

const initialState = {
  loading: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categoryItems:action.payload[Object.keys(action.payload).filter(value=>{
            return action.payload[value].id === action.categoryId
        })]
      }
    default:
      return state;
  }
}