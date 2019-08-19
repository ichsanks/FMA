import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Button = ({ title, onPress, color }) => (
  <TouchableWithoutFeedback
    style={styles.buttonContainer}
    underlayColor="transparent"
    onPress={onPress}
  >
    <View style={[styles.button, { borderColor: color || "#39b54a" }]}>
      <Text style={{ color: color || "#39b54a", fontSize: 14 }}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

export const HeaderButtonIcon = ({ iconName, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View>
      <Ionicons
        name={iconName}
        size={25}
        color="white"
        style={{ paddingHorizontal: 20 }}
      />
    </View>
  </TouchableWithoutFeedback>
);

export const DeleteButton = ({ title, onPress }) => (
  <View style={{ position: "absolute", bottom: 50, width: "100%" }}>
    <TouchableWithoutFeedback
      underlayColor="transparent"
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <View style={[styles.button, { borderColor: "#ff3b50" }]}>
        <Text style={{ color: "#ff3b50", fontSize: 14 }}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingVertical: 10
  },
  button: {
    height: 40,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  },
  headerButton: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 10
  }
});
