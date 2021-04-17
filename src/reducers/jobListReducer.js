import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR} from '../constants';

const initialState = {
  list:[],  
  loading: false,
  error: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case JOB_LIST_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case JOB_LIST_SUCCESS: 
          return {
            ...state,
            start:action.start,
            end:action.end,
            list: action.list,
            error: false,
            loading: false
          }
        case JOB_LIST_ERROR:
          return {
            ...state,
            list: [],
            error:true
          }
        default:
            return state;
    }
  }