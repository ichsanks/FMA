import * as t from "./actionTypes";
import * as api from "./api";
import { getUserToken } from "../users/api";
import { NavigationActions } from "react-navigation";
import { sendPushNotification } from "../../services/pushNotification";

export const onChangeAssetForm = ({ props, value }) => {
  return {
    type: t.ON_CHANGE_ASSET_FORM,
    payload: { props, value }
  };
};

export const resetAssetForm = () => {
  return {
    type: t.RESET_ASSET_FORM
  };
};

export const fetchAssets = location => {
  return dispatch => {
    api.fetchAssets(location, (success, data, error) => {
      if (success) dispatch({ type: t.FETCH_ASSETS_SUCCESS, payload: data });
      else if (error) alert(error);
    });
  };
};

export const fetchCurrentAsset = code => {
  return dispatch => {
    api.fetchCurrentAsset(code, (success, data, error) => {
      if (success) {
        dispatch({
          type: t.FETCH_CURRENT_ASSET_SUCCESS,
          payload: data
        });
        dispatch(NavigationActions.navigate({ routeName: "AssetDetails" }));
      } else if (error) alert(error);
    });
  };
};

export const addAsset = asset => {
  return dispatch => {
    const { code, currFilterLocation } = asset;
    api.checkAssetAvailability(code, (success, exist, error) => {
      if (success) {
        if (!exist) {
          api.addAsset(asset, (success, error) => {
            if (success) {
              dispatch({ type: t.RESET_ASSET_FORM });
              api.fetchAssets(currFilterLocation, (success, data, error) => {
                if (success) {
                  dispatch({ type: t.FETCH_ASSETS_SUCCESS, payload: data });
                  dispatch(
                    NavigationActions.navigate({ routeName: "AssetList" })
                  );
                } else if (error) alert(error);
              });
            } else if (error) {
              alert(error);
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

export const updateAsset = asset => {
  const { currFilterLocation } = asset;
  return dispatch => {
    api.updateAsset(asset, (success, error) => {
      if (success) {
        api.fetchAssets(currFilterLocation, (success, data, error) => {
          if (success) {
            dispatch({ type: t.FETCH_ASSETS_SUCCESS, payload: data });
            dispatch({ type: t.ON_CHANGE_ASSET_FORM, payload: asset });
            dispatch(NavigationActions.back());
          } else if (error) alert(error);
        });
      } else if (error) alert(error);
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

export const changeBorrowState = state => {
  return dispatch => {
    api.changeBorrowState(state, (success, data, error) => {
      if (success) {
        dispatch({ type: t.CHANGE_BORROW_STATE, payload: data });
        sendNotification(state);
      } else if (error) alert(error);
    });
  };
};

export const changeAssetLocation = location => {
  return {
    type: t.CHANGE_ASSET_LOCATION,
    payload: location
  };
};

export const moveAssetLocation = data => {
  return dispatch => {
    api.moveAssetLocation(data, (success, error) => {
      if (success)
        dispatch({ type: t.CHANGE_ASSET_LOCATION, payload: data.location });
      else if (error) alert(error);
    });
  };
};

export const fetchLocations = () => {
  return dispatch => {
    api.fetchLocations((success, data, error) => {
      if (success) dispatch({ type: t.FETCH_LOCATION_SUCCESS, payload: data });
      else if (error) alert(error);
    });
  };
};

export const changeAssetFilter = location => {
  return dispatch => {
    api.fetchAssets(location, (success, data, error) => {
      if (success) {
        dispatch({ type: t.CHANGE_ASSET_FILTER, payload: location });
        dispatch({ type: t.FETCH_ASSETS_SUCCESS, payload: data });
      } else if (error) alert(error);
    });
  };
};

export const toggleModalLocation = state => {
  return {
    type: t.TOGGLE_MODAL_LOCATION,
    payload: state
  };
};

export const toggleModalFilter = state => {
  return {
    type: t.TOGGLE_MODAL_FILTER,
    payload: state
  };
};

const sendNotification = data => {
  const { code, state, borroweruid, username } = data;
  let uid = ["approved", "rejected"].includes(state) ? borroweruid : "admin",
    message = null;
  if (["approved", "rejected"].includes(state)) {
    message = `${username} ${state} your proposition`;
  } else if (["cancelled", "returned", "proposing"].includes(state)) {
    switch (state) {
      case "proposing":
        message = `${username} wants to borrow asset no ${code}`;
        break;
      case "cancelled":
        message = `${username} cancelled to borrow asset no ${code}`;
        break;
      case "returned":
        message = `${username} returned asset no ${code}`;
        break;
    }
  }

  getUserToken(uid, (success, token, error) => {
    if (success) {
      if (Array.isArray(token)) {
        token.forEach(item => {
          sendPushNotification(item, state, message, code);
        });
      } else sendPushNotification(token, state, message, code);
    } else if (error) alert(error);
  });
};

export const createPDF = () => {
  return dispatch => {
    dispatch({ type: t.GENERATING_REPORT });
    api.getReportData((success, report, error) => {
      if (success) {
        api.sendReport(report, (success, error) => {
          if (success) {
            dispatch({ type: t.GENERATE_REPORT_SUCCESS });
            alert("Report has been send to your email");
          } else if (error) alert(error);
        });
      } else if (error) alert(error);
    });
  };
};
