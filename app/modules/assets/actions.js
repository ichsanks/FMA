import * as t from "./actionTypes";
import * as api from "./api";
import { NavigationActions } from "react-navigation";

export const fetchAssets = errorCB => {
  return dispatch => {
    api.fetchAssets((success, data, error) => {
      if (success) dispatch({ type: t.FETCH_ASSETS_SUCCESS, payload: data });
      else if (error) errorCB(error);
    });
  };
};

export const addAsset = (asset, successCB, errorCB) => {
  return dispatch => {
    const { code } = asset;
    api.checkAssetAvailability(code, (success, exist, error) => {
      if (success) {
        if (!exist) {
          api.addAsset(asset, (success, data, error) => {
            if (success) {
              dispatch({ type: t.ADD_ASSET });
              dispatch(NavigationActions.navigate({ routeName: "AssetList" }));
            } else if (error) {
              errorCB(error);
            }
          });
        } else {
          alert("Code Exist!");
        }
      } else {
        alert(error);
      }
    });
  };
};

export const updateAsset = (asset, successCB, errorCB) => {
  return dispatch => {
    api.updateAsset(asset, (success, data, error) => {
      if (success) {
        dispatch(NavigationActions.navigate({ routeName: "AssetList" }));
      }
    });
  };
};

export const deleteAsset = (code, errorCB) => {
  return dispatch => {
    api.deleteAsset(code, (success, error) => {
      if (success) {
        dispatch({ type: t.DELETE_ASSET });
        dispatch(NavigationActions.navigate({ routeName: "AssetList" }));
      } else if (error) {
        errorCB(error);
      }
    });
  };
};

export const proposeBorrowAsset = () => {
  return;
};

export const approveBorrowAsset = () => {
  return;
};

export const onChangeAsset = ({ props, value }) => {
  return {
    type: t.ON_CHANGE_ASSET,
    payload: { props, value }
  };
};

export const resetAssetForm = () => {
  return {
    type: t.RESET_ASSET_FORM
  };
};
