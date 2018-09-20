import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import Logo from "../components/logo";
import { connect } from "react-redux";
import { fetchAssets } from "../../assets/actions";

class Splash extends Component {
  componentDidMount() {
    this.props.initialize();
    /* AsyncStorage.getItem("user", (error, result) => {
      if (result) {
        this.props.navigation.navigate("AssetList");
      } else {
        this.props.navigation.navigate("SignIn");
      }
    }); */
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    assets: state.assetReducer
  };
};

export default connect(
  mapStateToProps,
  { fetchAssets }
)(Splash);
