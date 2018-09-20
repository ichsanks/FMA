import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet
} from "react-native";

export const Container = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>{children}</View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
