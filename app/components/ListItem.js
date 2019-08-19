import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";

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
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 7
  },
  title: {
    fontSize: 16,
    color: "#444444"
  },
  description: {
    fontSize: 14,
    color: "grey"
  },
  separator: {
    backgroundColor: "#dadada",
    height: StyleSheet.hairlineWidth,
    marginLeft: 25
  }
});
