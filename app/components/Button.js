import React from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from "react-native";
import Ionicons from "@expo/vector-icons";

export const Button = ({ title, onPress }) => (
  <TouchableHighlight
    style={styles.buttonContainer}
    underlayColor="transparent"
    onPress={onPress}
  >
    <View style={styles.button}>
      <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
    </View>
  </TouchableHighlight>
);

export const HeaderButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.headerButton}>{title}</Text>
  </TouchableOpacity>
);

export const HeaderButtonIcon = ({ iconName, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name={iconName} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#39b54a",
    borderRadius: 25
  },
  headerButton: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10
  }
});
