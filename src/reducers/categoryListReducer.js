import {CATEGORY_LIST_REQUEST , CATEGORY_LIST_SUCCESS , CATEGORY_LIST_ERROR} from '../constants';

const initialState = {
  categoryList:[],  
  loading: false,
  error: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case CATEGORY_LIST_SUCCESS:
          return {
            ...state,
            categoryList: action.list,
            error: false,
            loading: false
          }
        case CATEGORY_LIST_ERROR:
          return {
            ...state,
            categoryList: [],
            error:true
          }
        default:
            return state;
    }
  }