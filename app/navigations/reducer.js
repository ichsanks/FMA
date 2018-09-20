import Routes from "../navigations/Routes";

const router = Routes.router;
const initialAction = router.getActionForPathAndParams("Splash");
const initialState = router.getStateForAction(initialAction);

const navReducer = (state = initialState, action) => {
  let nextState;

  /* switch (action.type) {
    case "AssetCreate":
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: "AssetCreate" })
      );
      break;
    case "AssetList":
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: "AssetList" })
      );
      break;
    default:
      nextState = router.getStateForAction(action, state);
      break;
  } */

  nextState = router.getStateForAction(action, state);

  return nextState || state;
};

export default navReducer;
