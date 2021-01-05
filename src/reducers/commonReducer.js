import {FETCH_PARENT_CATEGORIES, FETCH_CUSTOMER_DATA} from '../constants';

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
    case FETCH_CUSTOMER_DATA:
      return{
        ...state,
        "customerData":action.customerData.filter((data) => {
          return data.id === action.customerId
        })[0],
        "jobData":action.jobsData.filter((data) => {
          return data.customerId == action.customerId
        })
      }  
    default:
      return state;
  }
}
