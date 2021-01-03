import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import categoryReducer from "./categoryReducer";
import jobsReducer from "./jobsReducer";


const rootReducer = combineReducers({
  common: commonReducer,
  category:categoryReducer,
  fetchJobs:jobsReducer
});

export default rootReducer;
