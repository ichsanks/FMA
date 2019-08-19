import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Container, Spinner } from "../../../components/basic";
import { ListItem, Separator } from "../../../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fetchUsers, fetchCurrentUser } from "../actions";

class UserList extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-person${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    )
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleLoadMore() {}

  handleRefresh() {}

  keyExtractor = (item, index) => item.uid;

  onPressItem = item => {
    this.props.fetchCurrentUser(item.uid);
  };

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => this.onPressItem(item)}
      title={item.name}
      description={item.email}
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

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>{this.renderList()}</View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { loading, data } = state.userReducer;
  return { loading, data };
};

export default connect(
  mapStateToProps,
  { fetchUsers, fetchCurrentUser }
)(UserList);
