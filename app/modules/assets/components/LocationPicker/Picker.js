import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet } from "react-native";
import ModalList from "./ModalList";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { toggleModalLocation } from "../../actions";

class Picker extends Component {
  renderPicker = () => {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.toggleModalLocation(!this.props.modalVisible)
          }
        >
          <View style={styles.container}>
            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.input}>{this.props.location}</Text>
            <Ionicons name={`ios-arrow-forward`} style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
        <ModalList action={this.props.action} />
      </View>
    );
  };

  renderText = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Lokasi</Text>
        <Text style={styles.input}>{this.props.location}</Text>
      </View>
    );
  };

  render() {
    return this.props.role === "admin" &&
      (!this.props.borrow || !this.props.borrow.borrowState)
      ? this.renderPicker()
      : this.renderText();
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e0e0e0"
  },
  input: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#444444"
  },
  label: {
    position: "absolute",
    left: 25,
    top: 5,
    color: "grey"
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
  const { location, borrow, modalVisible } = state.assetFormReducer;
  const { role } = state.authReducer;
  return { location, borrow, role, modalVisible };
};

export default connect(
  mapStateToProps,
  { toggleModalLocation }
)(Picker);
