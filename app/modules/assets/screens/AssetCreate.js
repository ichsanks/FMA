import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";
import { connect } from "react-redux";
import { Container, HeaderButton } from "../../../components/basic";
import AssetForm from "../components/AssetForm";
import { addAsset, onChangeAsset, resetAssetForm } from "../actions";

class AssetCreate extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Add Asset",
      headerLeft: (
        <HeaderButton title="Cancel" onPress={() => navigation.goBack()} />
      ),
      headerRight: (
        <HeaderButton title="Add" onPress={() => params.handleSave()} />
      )
    };
  };

  onSave = () => {
    const { code, name, pic, location } = this.props;
    this.props.addAsset({ code, name, pic, location });
  };

  componentDidMount() {
    const item = this.props.navigation.getParam("item");

    this.props.resetAssetForm();
    this.props.navigation.setParams({ handleSave: () => this.onSave() });

    for (let props in item) {
      this.props.onChangeAsset({ props, value: item[props] });
    }
  }

  render() {
    return (
      <Container>
        <AssetForm />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { code, name, pic, location } = state.assetFormReducer;
  return { code, name, pic, location };
};

export default connect(
  mapStateToProps,
  { addAsset, onChangeAsset, resetAssetForm }
)(AssetCreate);
