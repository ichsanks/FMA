import React, { Component } from "react";
import {
  Modal,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from "react-native";
import { Separator } from "../../../../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  changeAssetFilter,
  toggleModalFilter,
  fetchAssets
} from "../../actions";

class ModalList extends Component {
  onPressItem(item) {
    this.props.changeAssetFilter(item.name);
    this.props.toggleModalFilter(!this.props.modalVisible);
  }

  keyExtractor = (item, index) => item.name;

  renderSeparator = () => <Separator />;

  renderCheckmark = name => {
    if (this.props.currFilterLocation === name)
      return <Ionicons name={`ios-checkmark-circle`} style={styles.icon} />;
  };

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressItem(item)}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Text style={{ fontSize: 16, color: "#444444" }}>{item.name}</Text>
          {this.renderCheckmark(item.name)}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        onRequestClose={() =>
          this.props.toggleModalFilter(!this.props.modalVisible)
        }
      >
        <View>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.toggleModalFilter(!this.props.modalVisible)
            }
          >
            <View
              style={[
                styles.row,
                {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: "#dadada"
                }
              ]}
            >
              <Ionicons
                name={`ios-arrow-back`}
                style={{ fontSize: 20, marginRight: 10 }}
              />
              <Text style={{ fontSize: 16 }}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.data}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: "center"
  },
  icon: {
    color: "#00adbb",
    fontSize: 24,
    position: "absolute",
    right: 25,
    top: 8
  }
});

const mapStateToProps = state => {
  const { currFilterLocation, modalVisible } = state.assetReducer;
  const { data } = state.locationReducer;
  return { data, modalVisible, currFilterLocation };
};

export default connect(
  mapStateToProps,
  { changeAssetFilter, toggleModalFilter, fetchAssets }
)(ModalList);
