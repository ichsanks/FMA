import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Logo from "../components/logo";
import { connect } from "react-redux";
import { initialize } from "../actions";

class Splash extends Component {
  async componentDidMount() {
    this.props.initialize();
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
  return state;
};

export default connect(
  mapStateToProps,
  { initialize }
)(Splash);
