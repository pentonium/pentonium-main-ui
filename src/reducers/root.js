import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import categoryReducer from "./categoryReducer";
import jobsReducer from "./jobsReducer";
import jobListReducer from './jobListReducer';
import jobReducer from './JobReducers';
import categoryListReducer from "./categoryListReducer";


const rootReducer = combineReducers({
  common: commonReducer,
  category:categoryReducer,
  fetchJobs:jobsReducer,
  jobList:jobListReducer,
  jobReducer:jobReducer,
  categoryList:categoryListReducer
});

export default rootReducer;
