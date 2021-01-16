import {FETCH_FEATURED_JOBS , FETCH_HIGHRATED_JOBS , FETCH_NEW_JOBS , FETCH_JOB_DATA, FETCH_HASH_JOB_DATA} from '../constants';
import {sortJSONData} from '../helpers';
import ipfs from '../ipfs';

const initialState = {
  loading: false,
  error: false,
  ratedData:[],
  featuredData:[],
  newData:[],
  jobDescription:[]

};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FEATURED_JOBS:
      return {
        ...state,
        featuredData:action.payload.filter(value=>{
            return value.isFeatured === true
        })
    }
    case FETCH_HIGHRATED_JOBS:
      return {
        ...state,
        ratedData:action.payload.sort(sortJSONData('budget'))
    }
    case FETCH_NEW_JOBS:
      return {
        ...state,
        newData:action.payload.filter(value=>{
          return value.isHash === true
      })
    }
    case FETCH_JOB_DATA:
      return {
        ...state,
        jobDescription:action.payload.filter(value=>{
            return value.id === action.jobId
        })
    }
    case FETCH_HASH_JOB_DATA:
      return{
        ...state,
        hashedData:action.payload,
        isHash:true
      }
    default:
      return state;
  }
}
