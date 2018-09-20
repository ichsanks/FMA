import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { Container, Button, Textbox } from "../../../components/basic";
import Logo from "../components/logo";
import { onChangeSignIn, signIn } from "../actions";

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  onSubmit() {
    const { email, password } = this.props;
    this.props.signIn({ email, password });
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
                this.props.onChangeSignIn({ props: "email", value })
              }
            />
            <Textbox
              label="Password"
              editable={this.props.editable}
              value={this.props.password}
              secureTextEntry={true}
              onChangeText={value =>
                this.props.onChangeSignIn({ props: "password", value })
              }
            />
            <Button title="Sign In" onPress={() => this.onSubmit()} />
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
  return { email, password };
};

export default connect(
  mapStateToProps,
  { onChangeSignIn, signIn }
)(SignIn);
