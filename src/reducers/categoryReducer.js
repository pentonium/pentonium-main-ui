import {FETCH_CATEGORIES , CATEGORY_CU_REQUEST , CATEGORY_CU_SUCCESS , CATEGORY_CU_ERROR} from '../constants';

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
    case CATEGORY_CU_REQUEST: 
      return {
          ...state,
          error: false,
          loading: true
      }
    case CATEGORY_CU_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
      }
    case CATEGORY_CU_ERROR:
      return {
        ...state,
        error:true
      } 
    default:
      return state;
  }
}