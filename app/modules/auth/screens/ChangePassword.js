import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Textbox, Button } from "../../../components/basic";
import { passwordOnChange } from "../actions";

class ChangePassword extends Component {
  render() {
    return (
      <Container>
        <Textbox placeholder="Enter new password" secureTextEntry={true} />
        <Textbox placeholder="Re-enter new password" secureTextEntry={true} />
        <Button text="Submit" />
      </Container>
    );
  }
}

const mapStateToProps = state => {};

export default connect(
  mapStateToProps,
  { passwordOnChange }
)(ChangePassword);
