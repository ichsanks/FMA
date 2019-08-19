import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet } from "react-native";
import ModalList from "./ModalList";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { toggleModalFilter } from "../../actions";

class Picker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.props.toggleModalFilter(!this.props.modalVisible)}
        >
          <View style={styles.btn}>
            <Text style={{ fontSize: 16, color: "#aaaaaa", marginRight: 20 }}>
              Filter Location :
            </Text>
            <Text style={{ fontSize: 16, color: "#444444" }}>
              {this.props.currFilterLocation}
            </Text>
            <Ionicons name="ios-arrow-forward" style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
        <ModalList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#dadada"
  },
  btn: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row"
  },
  icon: {
    position: "absolute",
    right: 25,
    top: 15,
    fontSize: 24,
    color: "#444444"
  }
});

const mapStateToProps = state => {
  const { currFilterLocation, modalVisible } = state.assetReducer;
  return { currFilterLocation, modalVisible };
};

export default connect(
  mapStateToProps,
  { toggleModalFilter }
)(Picker);
