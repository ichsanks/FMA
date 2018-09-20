import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, HeaderButton } from "../../../components/basic";
import AssetForm from "../components/AssetForm";
import { updateAsset } from "../actions";

class AssetDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Edit Asset",
      headerRight: (
        <HeaderButton onPress={() => params.handleSave()} title="Update" />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: () => this.onSave() });
  }

  onSave = () => {
    const { code, name, pic, location } = this.props;
    this.props.updateAsset({ code, name, pic, location });
  };

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
  { updateAsset }
)(AssetDetails);
