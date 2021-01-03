import {FETCH_FEATURED_JOBS , FETCH_HIGHRATED_JOBS , FETCH_NEW_JOBS} from '../constants';
import {sortJSONData} from '../helpers';

const initialState = {
  loading: false,
  error: false,
  ratedData:[],
  featuredData:[],
  newData:[]

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
            return value.isNew === true
        })
    }
    default:
      return state;
  }
}