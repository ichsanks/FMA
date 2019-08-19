import { combineReducers } from "redux";
import {
  authReducer,
  authFormReducer,
  passwordFormReducer
} from "../modules/auth/reducer";
import {
  assetReducer,
  assetFormReducer,
  locationReducer
} from "../modules/assets/reducer";
import { userReducer, userFormReducer } from "../modules/users/reducer";
import { scannerReducer } from "../modules/scanner/reducer";
import navReducer from "../navigations/reducer";

export default combineReducers({
  authReducer,
  authFormReducer,
  passwordFormReducer,
  assetReducer,
  assetFormReducer,
  userReducer,
  userFormReducer,
  scannerReducer,
  locationReducer,
  navReducer
});
