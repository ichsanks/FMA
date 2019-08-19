import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo";
import { Container } from "../../../components/basic";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { scanBarcode, changeScanState } from "../actions";

class Scanner extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-qr-scanner${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.props.changeScanState(!this.props.isScanning);
    });
    this.props.navigation.addListener("willBlur", () => {
      this.props.changeScanState(!this.props.isScanning);
    });
  }

  handleBarCodeScanned = ({ data }) => {
    const { role } = this.props;
    this.props.scanBarcode({ role, code: data });
  };

  renderScanner = () => {
    if (this.props.isScanning) {
      return (
        <BarCodeScanner
          style={styles.barcode}
          onBarCodeRead={this.handleBarCodeScanned}
        />
      );
    }
  };

  renderMessage = () => {
    if (this.props.message) {
      return <Text style={styles.message}>{this.props.message}</Text>;
    }
  };

  render() {
    return (
      <Container>
        <View style={styles.infoContainer}>{this.renderMessage()}</View>
        {this.renderScanner()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    top: 200,
    left: "10%",
    right: "10%"
  },
  message: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 5,
    fontSize: 12
  },
  barcode: {
    flexGrow: 1
  }
});

const mapStateToProps = state => {
  const { isScanning, message } = state.scannerReducer;
  const { role } = state.authReducer;
  return { isScanning, message, role };
};

export default connect(
  mapStateToProps,
  { scanBarcode, changeScanState }
)(Scanner);
