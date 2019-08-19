import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, DeleteButton } from "../../../components/basic";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { signOut } from "../actions";

class Settings extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-settings${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  };

  onSignOut = () => {
    this.props.signOut(this.props.uid);
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Button
            title="CHANGE PASSWORD"
            onPress={() => this.props.navigation.navigate("ChangePassword")}
          />
          <DeleteButton title="SIGN OUT" onPress={() => this.onSignOut()} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "column",
    flexGrow: 1,
    paddingTop: 20
  }
});

const mapStateToProps = state => {
  return ({ uid } = state.authReducer);
};

export default connect(
  mapStateToProps,
  { signOut }
)(Settings);
