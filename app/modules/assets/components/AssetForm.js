import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Textbox } from "../../../components/basic";
import { onChangeAsset } from "../actions";

class AssetForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Textbox
          label="Kode Aset"
          editable={this.props.editable}
          autoCapitalize="characters"
          value={this.props.code.toUpperCase()}
          onChangeText={value =>
            this.props.onChangeAsset({ props: "code", value })
          }
        />
        <Textbox
          label="Nama Aset"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.name}
          onChangeText={value =>
            this.props.onChangeAsset({ props: "name", value })
          }
        />
        <Textbox
          label="Person in Charge"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.pic}
          onChangeText={value =>
            this.props.onChangeAsset({ props: "pic", value })
          }
        />
        <Textbox
          label="Lokasi"
          editable={this.props.editable}
          autoCapitalize="words"
          value={this.props.location}
          onChangeText={value =>
            this.props.onChangeAsset({ props: "location", value })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { code, name, pic, location } = state.assetFormReducer;
  return { code, name, pic, location };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 20
  }
});

export default connect(
  mapStateToProps,
  { onChangeAsset }
)(AssetForm);
