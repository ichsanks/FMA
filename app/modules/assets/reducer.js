import * as t from "./actionTypes";
import { SIGN_OUT } from "../auth/actionTypes";

let InitialState = {
  currFilterLocation: "R. Kasir",
  loading: true,
  modalVisible: false,
  isGeneratingReport: false,
  data: []
};

let InitialFormState = {
  modalVisible: false,
  code: "",
  name: "",
  pic: "",
  location: "R. Kasir",
  borrow: null
};

let InitialLocationState = {
  loading: true,
  data: []
};

export const assetReducer = (state = InitialState, action) => {
  switch (action.type) {
    case t.FETCH_ASSETS_SUCCESS: {
      let { payload } = action;
      let data = [];

      for (let prop in payload) {
        let item = payload[prop];
        item.code = prop;
        data.push(item);
      }

      return { ...state, data, loading: false };
    }
    case t.GENERATING_REPORT:
      return { ...state, isGeneratingReport: true };
    case t.GENERATE_REPORT_SUCCESS:
      return { ...state, isGeneratingReport: false };
    case t.CHANGE_ASSET_FILTER:
      return { ...state, currFilterLocation: action.payload };
    case t.TOGGLE_MODAL_FILTER:
      return { ...state, modalVisible: action.payload };
    case SIGN_OUT:
      return InitialState;
    default:
      return state;
  }
};

export const assetFormReducer = (state = InitialFormState, action) => {
  switch (action.type) {
    case t.ON_CHANGE_ASSET_FORM:
      return { ...state, [action.payload.props]: action.payload.value };
    case t.FETCH_CURRENT_ASSET_SUCCESS:
      const { code, name, location, pic, borrow } = action.payload;
      return { ...state, code, name, location, pic, borrow };
    case t.CHANGE_BORROW_STATE:
      return { ...state, borrow: action.payload };
    case t.CHANGE_ASSET_LOCATION:
      return { ...state, location: action.payload };
    case t.TOGGLE_MODAL_LOCATION:
      return { ...state, modalVisible: action.payload };
    case t.RESET_ASSET_FORM:
    case SIGN_OUT:
      return InitialFormState;
    default:
      return state;
  }
};

export const locationReducer = (state = InitialLocationState, action) => {
  switch (action.type) {
    case t.FETCH_LOCATIONS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case SIGN_OUT:
      return InitialLocationState;
    default:
      return state;
  }
};
