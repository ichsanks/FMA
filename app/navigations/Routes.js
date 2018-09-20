import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

const AuthRoutes = createStackNavigator({ SignIn });

const Routes = createSwitchNavigator({ Splash, UserRoute, AdminRoute, AuthRoutes });

export default Routes;
