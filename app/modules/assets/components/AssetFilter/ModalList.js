import React, { Component } from "react";
import { FlatList } from "react-native";
import { onFilterAsset } from "../../actions";
import { connect } from "react-redux";

class ModalList extends Component {
  render() {
    return <FlatList />;
  }
}

const mapStateToProps = state => {
  const { currFilterLocation } = state.assetReducer;
  const { locations } = state.locationReducer;
  return { currFilterLocation, locations };
};

export default connect(
  mapStateToProps,
  { onFilterAsset }
)(ModalList);
