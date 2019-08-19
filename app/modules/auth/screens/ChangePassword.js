import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Textbox, Button } from "../../../components/basic";
import { connect } from "react-redux";
import { updatePassword, onChangePasswordForm } from "../actions";

class ChangePassword extends Component {
  static navigationOptions = () => {
    return { title: "Change Password" };
  };

  onChangePassword = () => {
    const { uid, currPassword, newPassword, confPassword } = this.props;
    if (!currPassword || !newPassword || !confPassword)
      alert("Please fill all fields correctly");
    else if (newPassword !== confPassword)
      alert("Konfirmasi Password tidak sama");
    else this.props.updatePassword({ uid, currPassword, newPassword });
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Textbox
            label="Password"
            editable={this.props.editable}
            value={this.props.currPassword}
            secureTextEntry={true}
            onChangeText={value =>
              this.props.onChangePasswordForm({ props: "currPassword", value })
            }
          />
          <Textbox
            label="Password Baru"
            editable={this.props.editable}
            value={this.props.newPassword}
            secureTextEntry={true}
            onChangeText={value =>
              this.props.onChangePasswordForm({ props: "newPassword", value })
            }
          />
          <Textbox
            label="Konfirmasi Password"
            editable={this.props.editable}
            value={this.props.confPassword}
            secureTextEntry={true}
            onChangeText={value =>
              this.props.onChangePasswordForm({ props: "confPassword", value })
            }
          />
          <View style={{ marginTop: 20 }}>
            <Button
              title="CHANGE PASSWORD"
              onPress={() => this.onChangePassword()}
            />
          </View>
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
  const { currPassword, newPassword, confPassword } = state.passwordFormReducer;
  const { uid, email } = state.authReducer;
  return { uid, email, currPassword, newPassword, confPassword };
};

export default connect(
  mapStateToProps,
  { updatePassword, onChangePasswordForm }
)(ChangePassword);
