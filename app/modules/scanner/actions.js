import * as t from "./actionTypes";
import * as api from "./api";
import {
  ON_CHANGE_ASSET_FORM,
  FETCH_CURRENT_ASSET_SUCCESS
} from "../assets/actionTypes";
import { checkAssetAvailability, fetchCurrentAsset } from "../assets/api";
import { NavigationActions } from "react-navigation";

export const scanBarcode = data => {
  return dispatch => {
    const { code, role } = data;
    checkAssetAvailability(code, (success, exist, error) => {
      if (success) {
        if (exist) {
          fetchCurrentAsset(code, (success, asset, error) => {
            if (success) {
              dispatch({ type: FETCH_CURRENT_ASSET_SUCCESS, payload: asset });
              dispatch(
                NavigationActions.navigate({ routeName: "AssetDetails" })
              );
            } else if (error) alert(error);
          });
        } else {
          if (role === "admin") {
            const item = { code };
            dispatch(
              NavigationActions.navigate({
                routeName: "AssetCreate",
                params: { item }
              })
            );
          } else
            dispatch({
              type: t.CHANGE_MESSAGE,
              payload: "No asset found"
            });
        }
      } else if (error) alert(error);
    });
  };
};

export const changeScanState = state => {
  return {
    type: t.CHANGE_SCAN_STATE,
    payload: state
  };
};
