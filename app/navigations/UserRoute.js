import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AssetList from "../modules/assets/screens/AssetList";
import AssetDetails from "../modules/assets/screens/AssetDetails";
import Scanner from "../modules/scanner/screens/Scanner";
import Settings from "../modules/auth/screens/Settings";

const Tab = { AssetList, Scanner, Settings };

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
      backgroundColor: "#00adbb",
      paddingHorizontal: 5
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
        title: "Asset",
        headerTitleStyle: {
          textAlign: "center",
          alignSelf: "center"
        }
      };
  }
};

const Stack = {
  TabRoutes,  
  AssetDetails
};

const UserRoutes = createStackNavigator(Stack, StackNavigatorConfig);

export default UserRoutes;