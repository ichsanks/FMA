import React, { Component } from "react";
import { TouchableHighlight, View } from "react-native";
import { Print } from "expo";

class AssetReport extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this.renderPDF()} />
      </View>
    );
  }
}
