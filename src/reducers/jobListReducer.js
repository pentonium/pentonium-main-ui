import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR , ALL_JOB_LIST_REQUEST , ALL_JOB_LIST_SUCCESS , ALL_JOB_LIST_ERROR} from '../constants';

const initialState = {
  list:[],  
  loading: false,
  error: false,
  fulllist:[]
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
        case ALL_JOB_LIST_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case ALL_JOB_LIST_SUCCESS: 
          return {
            ...state,
            fulllist: action.list,
            error: false,
            loading: false
          }
        case ALL_JOB_LIST_ERROR:
          return {
            ...state,
            fulllist: [],
            error:true
        }
        default:
            return state;
    }
  }