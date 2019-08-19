import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AssetList from "../modules/assets/screens/AssetList";
import AssetDetails from "../modules/assets/screens/AssetDetails";
import AssetCreate from "../modules/assets/screens/AssetCreate";
import AssetEdit from "../modules/assets/screens/AssetEdit";
import Scanner from "../modules/scanner/screens/Scanner";
import UserList from "../modules/users/screens/UserList";
import UserCreate from "../modules/users/screens/UserCreate";
import UserDetails from "../modules/users/screens/UserDetails";
import Settings from "../modules/auth/screens/Settings";
import ChangePassword from "../modules/auth/screens/ChangePassword";
import { HeaderButtonIcon } from "../components/basic";

const Tab = { AssetList, Scanner, UserList, Settings };

const TabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: "#00addb",
    inactiveTintColor: "grey"
  }
};

const StackNavigatorConfig = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#00adbb"
    },
    headerTitleStyle: {
      alignSelf: "center"
    },
    headerTintColor: "white"
  }
};

const TabRoutes = createBottomTabNavigator(Tab, TabNavigatorConfig);

TabRoutes.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  switch (routeName) {
    case "AssetList":
      return {
        title: "Assets",
        headerRight: (
          <HeaderButtonIcon
            iconName={`ios-add`}
            onPress={() => navigation.navigate("AssetCreate")}
          />
        )
      };
    case "UserList":
      return {
        title: "Users",
        headerRight: (
          <HeaderButtonIcon
            iconName={`ios-add`}
            onPress={() => navigation.navigate("UserCreate")}
          />
        )
      };
    case "Scanner":
      return { title: "Scanner" };
    case "Settings":
      return { title: "Settings" };
  }
};

const Stack = {
  TabRoutes,
  AssetCreate,
  AssetDetails,
  AssetEdit,
  UserDetails,
  UserCreate,
  ChangePassword
};

const AdminRoutes = createStackNavigator(Stack, StackNavigatorConfig);

export default AdminRoutes;
