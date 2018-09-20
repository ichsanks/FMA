import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { Container, Button, HeaderButton } from "../../../components/basic";
import AssetForm from "../components/AssetForm";
import { onChangeAsset, deleteAsset } from "../actions";

class AssetDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Asset Details",
      headerRight: (
        <HeaderButton
          onPress={() => navigation.navigate("AssetEdit")}
          title="Edit"
        />
      )
    };
  };

  componentDidMount() {
    const item = this.props.navigation.getParam("item");
    for (let props in item) {
      this.props.onChangeAsset({ props, value: item[props] });
    }
  }

  onDelete(code) {
    this.props.deleteAsset(code);
  }

  confirmDelete(code) {
    Alert.alert(
      "Hapus aset?",
      `Anda akan menghapus semua data terkait dengan aset nomor ${code}`,
      [
        {
          text: "Batal",
          style: "cancel"
        },
        { text: "Hapus", onPress: () => this.onDelete(code) }
      ],
      { cancelable: false }
    );
  }

  renderDelete() {
    return (
      <Button
        title="HAPUS"
        onPress={() => this.confirmDelete(this.props.code)}
      />
    );
  }

  render() {
    return (
      <Container>
        <AssetForm editable={false} />
        {this.renderDelete()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { code, name, pic, location, status } = state.assetFormReducer;
  return { code, name, pic, location, status };
};

export default connect(
  mapStateToProps,
  { onChangeAsset, deleteAsset }
)(AssetDetails);
