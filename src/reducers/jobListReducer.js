import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR , ALL_JOB_LIST_REQUEST , ALL_JOB_LIST_SUCCESS , ALL_JOB_LIST_ERROR , CLIENT_LIST_REQUEST , CLIENT_LIST_SUCCESS , CLIENT_LIST_ERROR} from '../constants';

const initialState = {
  list:[],  
  loading: false,
  error: false,
  fulllist:[],
  categoryNane: ""
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
            categoryNane: action.name,
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
        case CLIENT_LIST_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case CLIENT_LIST_SUCCESS: 
          return {
            ...state,
            start:action.start,
            end:action.end,
            list: action.list,
            categoryNane: action.name,
            error: false,
            loading: false
          }
        case CLIENT_LIST_ERROR:
          return {
            ...state,
            list: [],
            error:true
        }
        default:
            return state;
    }
  }