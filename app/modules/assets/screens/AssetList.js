import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { Notifications } from "expo";
import { Container, Spinner } from "../../../components/basic";
import { ListItem, Separator } from "../../../components/ListItem";
import AssetFilter from "../components/AssetFilter";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fetchCurrentAsset, createPDF } from "../actions";

class AssetList extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-list${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("fma", {
        name: "fma",
        sound: true,
        vibrate: [0, 250, 250, 250]
      });
    }

    Notifications.addListener(this.handleNotification);
  }

  generateReport = () => {
    this.props.createPDF();
  };

  handleNotification = ({ origin, data }) => {
    if (origin === "selected") {
      this.props.fetchCurrentAsset(data.code);
    }
  };

  handleLoadMore() {}

  handleRefresh() {}

  keyExtractor = (item, index) => item.code;

  onPressItem = item => {
    this.props.fetchCurrentAsset(item.code);
  };

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => this.onPressItem(item)}
      title={item.code}
      description={item.name}
    />
  );

  renderSeparator = () => <Separator />;

  renderList() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    if (!this.props.data.length) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 100
          }}
        >
          <Text style={{ fontSize: 18, color: "#aaaaaa" }}>No Asset Found</Text>
        </View>
      );
    }
    return (
      <FlatList
        style={{ backgroundColor: "white" }}
        keyExtractor={this.keyExtractor}
        data={this.props.data}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }

  renderReportButton = () => {
    if (this.props.role === "admin") {
      return (
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback
            onPress={() => this.generateReport()}
            underlayColor="transparent"
          >
            <View style={styles.button}>
              {this.props.isGeneratingReport ? (
                <Spinner size="small" />
              ) : (
                <Text style={{ fontSize: 14, color: "white" }}>
                  GENERATE REPORT
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <AssetFilter />
          {this.renderList()}
          {this.renderReportButton()}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "white"
  },
  button: {
    height: 40,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00addb",
    borderRadius: 25,
    borderWidth: 0,
    marginVertical: 10
  }
});

const mapStateToProps = state => {
  const { loading, data, isGeneratingReport } = state.assetReducer;
  const { role } = state.authReducer;
  return { loading, data, role, isGeneratingReport };
};

export default connect(
  mapStateToProps,
  { fetchCurrentAsset, createPDF }
)(AssetList);
