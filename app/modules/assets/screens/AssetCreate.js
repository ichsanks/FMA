import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, HeaderButtonIcon } from "../../../components/basic";
import AssetForm from "../components/AssetForm";
import { connect } from "react-redux";
import { addAsset, onChangeAssetForm, resetAssetForm } from "../actions";

class AssetCreate extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Add Asset",
      headerLeft: (
        <HeaderButtonIcon
          iconName={`ios-arrow-back`}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: (
        <HeaderButtonIcon
          iconName={`ios-send`}
          onPress={() => params.handleSave()}
        />
      )
    };
  };

  onSave = () => {
    const { code, name, pic, location, currFilterLocation } = this.props;
    if (!code || !name || !pic || !location)
      alert("Please fill all fields correctly");
    else this.props.addAsset({ code, name, pic, location, currFilterLocation });
  };

  componentDidMount() {
    const item = this.props.navigation.getParam("item");

    this.props.navigation.setParams({ handleSave: () => this.onSave() });
    this.props.resetAssetForm();

    if (item) {
      for (let props in item) {
        this.props.onChangeAssetForm({ props, value: item[props] });
      }
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <AssetForm editable={!this.props.loading} />
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
  const { currFilterLocation } = state.assetReducer;
  const { code, name, location, pic, loading } = state.assetFormReducer;
  return { code, name, location, pic, loading, currFilterLocation };
};

export default connect(
  mapStateToProps,
  { addAsset, onChangeAssetForm, resetAssetForm }
)(AssetCreate);
