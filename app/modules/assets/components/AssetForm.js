import React, { Component } from "react";
import { View } from "react-native";
import LocationPicker from "./LocationPicker";
import { connect } from "react-redux";
import { Textbox } from "../../../components/basic";
import { onChangeAssetForm } from "../actions";

class AssetForm extends Component {
  render() {
    return (
      <View>
        <Textbox
          label="Kode Aset"
          editable={this.props.editable}
          autoCapitalize="characters"
          value={this.props.code.toUpperCase()}
          onChangeText={value =>
            this.props.onChangeAssetForm({ props: "code", value })
          }
        />
        <Textbox
          label="Nama Aset"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.name}
          onChangeText={value =>
            this.props.onChangeAssetForm({ props: "name", value })
          }
        />
        <Textbox
          label="Person in Charge"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.pic}
          onChangeText={value =>
            this.props.onChangeAssetForm({ props: "pic", value })
          }
        />
        <LocationPicker action={this.props.action} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { code, name, pic } = state.assetFormReducer;
  return { code, name, pic };
};

export default connect(
  mapStateToProps,
  { onChangeAssetForm }
)(AssetForm);
