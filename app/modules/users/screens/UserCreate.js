import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, HeaderButtonIcon } from "../../../components/basic";
import UserForm from "../components/UserForm";
import { connect } from "react-redux";
import { addUser, resetUserForm } from "../actions";

class UserCreate extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Add User",
      headerRight: (
        <HeaderButtonIcon
          iconName={`ios-send`}
          onPress={() => params.handleSave()}
        />
      )
    };
  };

  onSave = () => {
    const { email, name } = this.props;
    if (!email || !name) alert("Please fill all fields correctly");
    else this.props.addUser({ email, name });
  };

  componentDidMount() {
    this.props.resetUserForm();
    this.props.navigation.setParams({ handleSave: () => this.onSave() });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <UserForm editable={!this.props.loading} />
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
  const { email, name, loading } = state.userFormReducer;
  return { email, name, loading };
};

export default connect(
  mapStateToProps,
  { addUser, resetUserForm }
)(UserCreate);
