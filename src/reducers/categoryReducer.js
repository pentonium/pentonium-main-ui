import {FETCH_CATEGORIES , CATEGORY_CU_REQUEST , CATEGORY_CU_SUCCESS , CATEGORY_CU_ERROR} from '../constants';

const initialState = {
  loadingCat: false,
  errorCat: false
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
          errorCat: false,
          loadingCat: true
      }
    case CATEGORY_CU_SUCCESS:
      return {
        ...state,
        errorCat: false,
        loadingCat: false
      }
    case CATEGORY_CU_ERROR:
      return {
        ...state,
        errorCat:true,
        laodingCat:false
      } 
    default:
      return state;
  }
}