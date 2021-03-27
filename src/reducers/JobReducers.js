import {POST_JOB_REQUEST , POST_JOB_SUCCESS , POST_JOB_ERROR , POST_UPDATE_JOB_REQUEST , POST_UPDATE_JOB_SUCCESS , POST_UPDATE_JOB_ERROR , DELETE_JOB_REQUEST ,DELETE_JOB_SUCCESS ,  DELETE_JOB_ERROR} from '../constants';

const initialState = {
  loading: false,
  error: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_JOB_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case POST_JOB_SUCCESS:
          console.log('POST_JOB_SUCCESS');
          return {
            ...state,
            error: false,
            loading: false
          }
        case POST_JOB_ERROR:
          return {
            ...state,
            error:true
          }
          case POST_UPDATE_JOB_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case POST_UPDATE_JOB_SUCCESS:
          return {
            ...state,
            error: false,
            loading: false
          }
        case POST_UPDATE_JOB_ERROR:
          return {
            ...state,
            error:true
          }
          case DELETE_JOB_REQUEST: 
        return {
            ...state,
            error: false,
            loading: true
        }
        case DELETE_JOB_SUCCESS:
          return {
            ...state,
            error: false,
            loading: false
          }
        case DELETE_JOB_ERROR:
          return {
            ...state,
            error:true
          }
        default:
            return state;
    }
  }