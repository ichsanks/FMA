import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, HeaderButtonIcon } from "../../../components/basic";
import AssetForm from "../components/AssetForm";
import { connect } from "react-redux";
import { updateAsset } from "../actions";

class AssetEdit extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Edit Asset",
      headerRight: (
        <HeaderButtonIcon
          iconName={`ios-send`}
          onPress={() => params.handleSave()}
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: () => this.onSave() });
  }

  onSave = () => {
    const { code, name, pic, location, currFilterLocation } = this.props;
    if (!code || !name || !pic || !location)
      alert("Please fill all fields correctly");
    else
      this.props.updateAsset({ code, name, pic, location, currFilterLocation });
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <AssetForm />
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
  const { code, name, pic, location } = state.assetFormReducer;
  const { currFilterLocation } = state.assetReducer;
  return { code, name, pic, location, currFilterLocation };
};

export default connect(
  mapStateToProps,
  { updateAsset }
)(AssetEdit);
