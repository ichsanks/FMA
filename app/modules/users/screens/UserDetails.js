import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, DeleteButton } from "../../../components/basic";
import UserForm from "../components/UserForm";
import { connect } from "react-redux";
import { deleteUser, resetPassword } from "../actions";

class UserDetails extends Component {
  static navigationOptions = () => {
    return { title: "User Details" };
  };

  onDeleteUser() {
    this.props.deleteUser(this.props.uid);
  }

  onResetPassword() {
    this.props.resetPassword(this.props.uid);
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <UserForm editable={false} />
          <View style={{ marginTop: 40 }}>
            <Button
              title="RESET PASSWORD"
              onPress={() => this.onResetPassword()}
            />
          </View>
          <DeleteButton title="HAPUS" onPress={() => this.onDeleteUser()} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 20,
    flexDirection: "column",
    flexGrow: 1
  }
});

const mapStateToProps = state => {
  const { uid } = state.userFormReducer;
  const { role } = state.authReducer;
  return { uid, role };
};

export default connect(
  mapStateToProps,
  { deleteUser, resetPassword }
)(UserDetails);
