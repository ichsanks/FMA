import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";

export const Separator = () => <View style={styles.separator} />;

export const ListItem = ({ title, description, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : ""}
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 8
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 20
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  description: {
    fontSize: 14
  },
  separator: {
    flex: 1,
    backgroundColor: "#dadada",
    height: StyleSheet.hairlineWidth,
    marginLeft: "5%"
  }
});
