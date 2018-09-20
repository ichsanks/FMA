import React, { Component } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import ModalList from "./ModalList";
import { connect } from "react-redux";

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() =>
            this.setState({ modalVisible: !this.state.modalVisible })
          }
        >
          <Text>{this.props.currFilterLocation}</Text>
        </TouchableHighlight>
        <ModalList visible={this.state.modalVisible} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { currFilterLocation } = state.assetReducer;
  return { currFilterLocation };
};

export default connect(mapStateToProps)(Picker);
