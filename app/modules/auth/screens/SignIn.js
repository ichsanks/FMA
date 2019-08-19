import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { Container, Button, Textbox } from "../../../components/basic";
import Logo from "../components/logo";
import { onChangeSignInForm, signIn } from "../actions";

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  onSubmit() {
    const { email, password, token } = this.props;
    if (!email || !password) alert("Please fill all fields correctly");
    else this.props.signIn({ email, password, token });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <Logo />
            <Textbox
              label="Email"
              editable={this.props.editable}
              autoCapitalize="none"
              value={this.props.email}
              onChangeText={value =>
                this.props.onChangeSignInForm({ props: "email", value })
              }
            />
            <Textbox
              label="Password"
              editable={this.props.editable}
              value={this.props.password}
              secureTextEntry={true}
              onChangeText={value =>
                this.props.onChangeSignInForm({ props: "password", value })
              }
            />
            <View style={{ marginTop: 20 }}>
              <Button title="SIGN IN" onPress={() => this.onSubmit()} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const { email, password } = state.authFormReducer;
  const { token } = state.authReducer;
  return { email, password, token };
};

export default connect(
  mapStateToProps,
  { onChangeSignInForm, signIn }
)(SignIn);
