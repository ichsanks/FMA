import * as t from "./actionTypes";

let initialState = {
  loading: true,
  data: []
};

let initialFormState = {
  code: "",
  name: "",
  pic: "",
  location: ""
};

export const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_ASSETS_SUCCESS: {
      let { payload } = action;
      let data = [];

      for (let prop in payload) {
        let item = payload[prop];
        item.code = prop;
        data.push(item);
      }

      data.reverse();

      return { ...state, data, loading: false };
    }
    case t.FETCH_ASSETS:
      return state;
    default:
      return state;
  }
};

export const assetFormReducer = (state = initialFormState, action) => {
  switch (action.type) {
    case t.ON_CHANGE_ASSET:
      return { ...state, [action.payload.props]: action.payload.value };
    case t.ADD_ASSET:
      return initialFormState;
    case t.UPDATE_ASSET:
      return InitialFormState;
    case t.RESET_ASSET_FORM:
      return initialFormState;
    case t.DELETE_ASSET:
      return initialFormState;
    case t.UPDATE_ASSET:
      return initialFormState;
    default:
      return state;
  }
};
