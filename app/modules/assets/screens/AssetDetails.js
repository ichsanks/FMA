import React, { Component } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Notifications } from "expo";
import {
  Container,
  DeleteButton,
  HeaderButtonIcon
} from "../../../components/basic";
import AssetForm from "../components/AssetForm";
import BorrowState from "../components/BorrowState";
import { connect } from "react-redux";
import { onChangeAsset, deleteAsset } from "../actions";

class AssetDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Asset Details",
      headerRight: (
        <HeaderButtonIcon
          iconName={`ios-create`}
          onPress={() => navigation.navigate("AssetEdit")}
        />
      )
    };
  };

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

  renderDeleteButton = () => {
    if (
      this.props.role === "admin" &&
      (!this.props.borrow || !this.props.borrow.borrowState)
    ) {
      return (
        <DeleteButton
          title="HAPUS"
          onPress={() => this.confirmDelete(this.props.code)}
        />
      );
    }
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <AssetForm editable={false} action="move" />
          <BorrowState />
          {this.renderDeleteButton()}
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
  const { code, name, pic, location, borrow } = state.assetFormReducer;
  const username = state.authReducer.name;
  const { role } = state.authReducer;
  return { code, name, pic, location, username, role, borrow };
};

export default connect(
  mapStateToProps,
  { onChangeAsset, deleteAsset }
)(AssetDetails);
