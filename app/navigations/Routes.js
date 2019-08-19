import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import SignIn from "../modules/auth/screens/SignIn";
import Splash from "../modules/auth/screens/Splash";

const AuthRoutes = createStackNavigator({ SignIn });

const Routes = createSwitchNavigator({
  Splash,
  UserRoute,
  AdminRoute,
  AuthRoutes
});

export default Routes;
