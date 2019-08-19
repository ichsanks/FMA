import React, { Component } from "react";
import { View } from "react-native";
import { Textbox } from "../../../components/basic";
import { connect } from "react-redux";
import { onChangeUserForm } from "../actions";

class UserForm extends Component {
  render() {
    return (
      <View>
        <Textbox
          label="Email"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.email}
          onChangeText={value =>
            this.props.onChangeUserForm({ props: "email", value })
          }
        />
        <Textbox
          label="Nama lengkap"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.name}
          onChangeText={value =>
            this.props.onChangeUserForm({ props: "name", value })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { email, name } = state.userFormReducer;
  return { email, name };
};

export default connect(
  mapStateToProps,
  { onChangeUserForm }
)(UserForm);
