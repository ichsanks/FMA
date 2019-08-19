import * as t from "./actionTypes";
import * as api from "./api";
import { NavigationActions } from "react-navigation";

export const onChangeUserForm = ({ props, value }) => {
  return {
    type: t.ON_CHANGE_USER_FORM,
    payload: { props, value }
  };
};

export const fetchUsers = () => {
  return dispatch => {
    api.fetchUsers((success, data, error) => {
      if (success) dispatch({ type: t.FETCH_USERS_SUCCESS, payload: data });
      else if (error) alert(error);
    });
  };
};

export const fetchCurrentUser = uid => {
  return dispatch => {
    api.fetchCurrentUser(uid, (success, data, error) => {
      if (success) {
        dispatch({ type: t.FETCH_CURRENT_USER_SUCCESS, payload: data });
        dispatch(NavigationActions.navigate({ routeName: "UserDetails" }));
      } else if (error) alert(error);
    });
  };
};

export const addUser = userdata => {
  return dispatch => {
    dispatch({ type: t.ADD_USER });
    api.addUser(userdata, (success, error) => {
      if (success) {
        api.fetchUsers((success, data, error) => {
          if (success) {
            dispatch({ type: t.FETCH_USERS_SUCCESS, payload: data });
            dispatch(NavigationActions.navigate({ routeName: "UserList" }));
            dispatch({ type: t.RESET_USER_FORM });
          } else if (error) alert(error);
        });
      } else if (error) alert(error);
    });
  };
};

export const deleteUser = uid => {
  return dispatch => {
    api.deleteUser(uid, (success, error) => {
      if (success) {
        api.fetchUsers((success, data, error) => {
          if (success) {
            dispatch({ type: t.FETCH_USERS_SUCCESS, payload: data });
            dispatch({ type: t.RESET_USER_FORM });
            dispatch(NavigationActions.navigate({ routeName: "UserList" }));
          } else if (error) alert(error);
        });
      } else if (error) alert(error);
    });
  };
};

export const resetPassword = uid => {
  return dispatch => {
    api.resetPassword(uid, (success, error) => {
      if (success) return dispatch({ type: t.RESET_PASSWORD });
      if (error) alert(error);
    });
  };
};

export const resetUserForm = () => {
  return {
    type: t.RESET_USER_FORM
  };
};
