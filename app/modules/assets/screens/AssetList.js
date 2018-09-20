import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { Container, Spinner } from "../../../components/basic";
import { ListItem, Separator } from "../../../components/ListItem";
import AssetFilter from "../components/AssetFilter";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

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
    /* this.props.fetchAssets(); */
  }

  handleLoadMore() {}

  handleRefresh() {}

  keyExtractor = (item, index) => item.code;

  onPressItem = item => {
    this.props.navigation.navigate("AssetDetails", { item });
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
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.data}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <AssetFilter />
          {this.renderList()}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { loading, data } = state.assetReducer;
  return { loading, data };
};

export default connect(mapStateToProps)(AssetList);
