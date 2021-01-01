import {FETCH_PARENT_CATEGORIES} from '../constants';

const initialState = {
  loading: false,
  error: false
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_PARENT_CATEGORIES:
      return {
        ...state,
        "parentCategories":
          Object.keys(action.payload).map((value,key) => {
              return {
                "name":value,
                "id":action.payload[value].id
              }
          })
      }
    default:
      return state;
  }
}
